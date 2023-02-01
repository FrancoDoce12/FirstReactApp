import { getFirestore, doc, addDoc, collection, getDocs, getDoc, query, where, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AppContext } from '../context/context';
import { auth } from '../firebase/config';
import { db } from '../firebase/config';
import { getUserByEmail, getUserIdByEmail, getUserRef, getUserById, getUserRefByID, registerUserInDb, updateUserSessionNumber } from '../firebase/functions';

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


async function registerUser(formUser, context, logInUser = true) {

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

    await saveUserDataInContext(userFromDb, context)
}

async function closeUserSession(context) {

    const userRef = await getUserRef(context.user.email)

    if (userRef){
        await updateDoc(userRef, { sessionNumber: null })
    }

    localStorage.setItem('sessionNumber', JSON.stringify(false))
    localStorage.setItem('userId', JSON.stringify(false))

    await deleteUserDataInContext(context)

}




async function checkUserSession(context) {

    const localSessionNumber = JSON.parse(localStorage.getItem('sessionNumber'))
    const localUserID = JSON.parse(localStorage.getItem('userId'))


    if (localSessionNumber && localUserID) {

        const userRef = getUserRefByID(localUserID)
        const userFromDb = await getDoc(userRef)

        if (localSessionNumber == userFromDb.data().sessionNumber) {

            await saveUserDataInContext(userFromDb, context)
            await setNewSessionNumber(userRef)

        }
    }
    context.setIsUserSessionCheck(true)

}
async function setNewSessionNumber(userRef) {
    const sessionNumber = getNewSessionNumber()
    localStorage.setItem('sessionNumber', JSON.stringify(sessionNumber))
    await updateDoc(userRef, { sessionNumber: sessionNumber })
    // trow some error if the update fails

}



// context functions

async function saveUserDataInContext(userFromDb, context) {
    const userData = userFromDb.data()
    await context.setUser({ email: userData.email, name: userData.name })
}

async function deleteUserDataInContext(context) {
    await context.setUser({})
}




function test(context) {
closeUserSession(context)

}



export { registerUser, checkPasswords, test, getUserByEmail, checkUserSession, isIterable, closeUserSession, openUserSession }