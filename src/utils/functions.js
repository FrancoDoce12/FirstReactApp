import { getFirestore, doc, addDoc, collection, getDocs, getDoc, query, where, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AppContext } from '../context/context';

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function checkPasswords(password1, password2) {
    return password1 == password2
}

//

function getNewSessionNumber() {
    return getRandomNumberBetween(0, Number.MAX_SAFE_INTEGER)
}

// save the session number in local storage and the same number in the db
//if the session is open in the database, request again the password and then change the session code
// the session code is a random number

//check always if the session code saved in the local storage it is the same than the session code in database
function comprobationUserRegistration(formUser) {

    if ((!formUser.email) && (!formUser.name) && (!formUser.password1) && (!formUser.password2)) {
        console.error(`User: ${formUser} is a invalid user`)
        return false
    }
    if (getUserByEmail(formUser.email)) {
        console.error(`Email ${formUser.email} alredy on use`)
        return false
    }


    // i dont know if its okay to check the first and the second password here
    // i think not, maybe its better to meake a special function and add complexity to
    // it and add some email verification to finaly register the accaunt in the DB
    // but it is not a serius web apliction
    if (!(formUser.password1 == formUser.password2)) {
        console.error(`User fist password and second password should be the same`)
        return false
    }
    return true
}


async function registerUser(formUser, logInUser) {

    console.log("comprobacion de usuario:",comprobationUserRegistration(formUser))

    if (comprobationUserRegistration(formUser)) {
        console.log("comprobacion de usuario:",comprobationUserRegistration(formUser), "ruvo que haber sido true")
        await addDoc(collection(getFirestore(), 'Users'), {
            name: formUser.name,
            email: formUser.email,
            password: formUser.password1
        })
        if (logInUser) {
            await openUserSession(user.email)
        }

        return true
    }
    console.log("registerUser tuvo que retornar false")
    return false

}


function logInUser(user) {
    // this user just should have the email and the password
    const userData = getUserByEmail(user.email).data()
    //checksPassword() isn't a function because it didn't need more complexity for now
    if ((userData.password == user.password)) {
        openUserSession(user.email)
    }

}

async function openUserSession(userEmail) {
    const userRef = getUserRef(userEmail)
    const sessionNumber = getNewSessionNumber()

    updateDoc(userRef, { sessionNumber })
    const userFromDb = await getDoc(userRef)

    localStorage.setItem('sessionNumber', JSON.stringify(sessionNumber))
    localStorage.setItem('userId', JSON.stringify(userFromDb.id))

    // thean add the respective context info of the user
    saveUserDataInContext(userFromDb)
}
async function closeUserSession(userEmail) {

    const userRef = getUserRef(userEmail)

    const updateQuery = updateDoc(userRef, { sessionNumber: undefined })

    localStorage.setItem('sessionNumber', JSON.stringify(undefined))
    localStorage.setItem('userId', JSON.stringify(undefined))

    deleteUserDataInContext()

    await updateQuery

}

async function getUserByEmail(userEmail) {
    return (await getDocs(query(collection(getFirestore(), 'Users'), where('email', '==', userEmail)))).docs[0]
}
async function getUserRef(userEmail) {
    return doc(db, `Users/${await getUserByEmail(userEmail).id}`)
}



async function checkUserSession() {

    const localSessionNumber = JSON.parse(localStorage.getItem('sessionNumber'))
    const localUserID = JSON.parse(localStorage.getItem('userId'))


    if (localSessionNumber && localUserID) {
        const db = getFirestore()
        const userRef = doc(db, `Users/${localUserID}`)
        const userFromDb = await getDoc(userRef)

        if (localSessionNumber == userFromDb.data().sessionNumber) {
            saveUserDataInContext(userFromDb)
            setNewSessionNumber(userRef)
            return true
        }
        return false
    }
    return false
}
async function setNewSessionNumber(userRef) {
    const sessionNumber = getNewSessionNumber()
    localStorage.setItem('sessionNumber', JSON.stringify(sessionNumber))
    await updateDoc(userRef, { sessionNumber: sessionNumber })
    // trow some error if the update fails

}

function saveUserDataInContext(userFromDb) {
    const context = useContext(AppContext)
    const userData = userFromDb.data()
    context.setUser({ email: userData.email, name: userData.name })
}

function deleteUserDataInContext() {
    const context = useContext(AppContext)
    context.setUser({})
}




async function test(a) {

}



export { registerUser, checkPasswords, test, getUserByEmail, checkUserSession, isIterable }