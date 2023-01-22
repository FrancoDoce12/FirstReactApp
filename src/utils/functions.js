import { getFirestore, doc, addDoc, collection, getDocs, getDoc, query, where, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AppContext } from '../context/context';
import { auth } from '../firebase/config';
import { db } from '../firebase/config';
import { getUserByEmail, getUserIdByEmail, getUserRef, getUserById, registerUserInDb, updateUserSessionNumber } from '../firebase/functions';

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
// if the session is open in the database, request again the password and then change the session code
// the session code is a random number

//check always if the session code saved in the local storage it is the same than the session code in database

// doc(getFirestore(),"Users","")
async function comprobationUserRegistration(formUser) {
    console.log("dentro de la comprobacion de usuario:")

    if ((!formUser.email) && (!formUser.name) && (!formUser.password1) && (!formUser.password2)) {
        console.error(`User: ${formUser} is a invalid user`)
        return false
    }



    let userByEmail = await getUserByEmail(formUser.email)
    console.log(userByEmail, "es lo que esta comprobando")
    if (userByEmail) {

        console.log("dio verdadero")
        console.error(`Email ${formUser.email} alredy on use`)
        return false
    } else {
        console.log("dio falso")
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


async function registerUser(formUser, logInUser, context) {

    console.log("comprobacion de usuario:", comprobationUserRegistration(formUser))

    if (await comprobationUserRegistration(formUser)) {

        console.log("comprobacion de usuario:", await comprobationUserRegistration(formUser), "ruvo que haber sido true")
        await registerUserInDb(formUser)

        if (logInUser) {
            console.log("logInUser se ejecuta")
            let loco = await openUserSession(formUser.email, context)
            console.log(loco)
        }

        return true
    }
    console.log("registerUser tuvo que retornar false")
    return false

}


async function logInUser(user, context) {
    // this user just should have the email and the password
    const userData = getUserByEmail(user.email).data()
    //checksPassword() isn't a function because it didn't need more complexity for now
    if ((userData.password == user.password)) {
        openUserSession(user.email, context)
    }

    // here it can return a notification object to use as notification

}

async function openUserSession(userEmail, context) {

    const sessionNumber = getNewSessionNumber()


    await updateUserSessionNumber(userEmail, { sessionNumber })


    const userFromDb = await getUserByEmail(userEmail)

    console.log("opening user session")

    localStorage.setItem('sessionNumber', JSON.stringify(sessionNumber))
    localStorage.setItem('userId', JSON.stringify(userFromDb.id))

    saveUserDataInContext(userFromDb, context)
}
async function closeUserSession(userEmail, context) {

    const userRef = getUserRef(userEmail)

    const updateQuery = updateDoc(userRef, { sessionNumber: undefined })

    localStorage.setItem('sessionNumber', JSON.stringify(undefined))
    localStorage.setItem('userId', JSON.stringify(undefined))

    deleteUserDataInContext(context)

    await updateQuery

}




async function checkUserSession(context) {

    const localSessionNumber = JSON.parse(localStorage.getItem('sessionNumber'))
    const localUserID = JSON.parse(localStorage.getItem('userId'))

    console.log(localSessionNumber, "localSessionNumber")
    console.log(localUserID, "localUserID")


    if (localSessionNumber && localUserID) {
        const db = getFirestore()
        const userRef = doc(db, `Users/${localUserID}`)
        const userFromDb = await getDoc(userRef)

        if (localSessionNumber == userFromDb.data().sessionNumber) {
            saveUserDataInContext(userFromDb, context)
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



// context functions

function saveUserDataInContext(userFromDb, context) {
    console.log(context)
    const userData = userFromDb.data()
    context.setUser({ email: userData.email, name: userData.name })
}

function deleteUserDataInContext(context) {
    context.setUser({})
}




async function test() {

    //  updateUserSessionNumber("tunatrossssdsdsla@gmail.com", {sessionNumber: 123})

    //     let a = await getUserByEmail("tunatrossssdsdsla@gmail.com")

    //     console.log(a.id, "test")
    // let e = doc(db,"Users",`${a.id}`)
    // console.log(e)
    // console.log((await getDoc(e)).data())

    //let a = await getDocs(query(collection(db, 'Users'), where('email', '==', userEmail))).docs[0]




}



export { registerUser, checkPasswords, test, getUserByEmail, checkUserSession, isIterable }