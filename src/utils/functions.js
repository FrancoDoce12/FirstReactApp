import { getDoc, updateDoc } from 'firebase/firestore';
import { userExists, getUserRef } from '../firebase/functions';


const sessionNumberKey = "sessionNumber"
const userIdKey = "userId"

const setIntoLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}
const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}



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


function validatePasswords(password1, password2) {
    if (validatePassword(password1)) {
        return password1 == password2
    }
    return false
}

const validatePassword = (password) => {
    // this function is intended to be used by all types of accounts
    // make more complex validation here
    if (password) {
        return true
    }
    return false
}

const validateDbPassword = (userSnapshot, userPassword) => {
    // write more complex validation here
    const userDbPassword = userSnapshot.data().password
    if (userDbPassword == userPassword) {
        return true
    }
    return false
}


function getNewSessionNumber() {
    return getRandomNumberBetween(0, Number.MAX_SAFE_INTEGER)
}


async function userValidation(formUser) {

    if ((!formUser.email) && (!formUser.name) && (!formUser.password1) && (!formUser.password2)) {
        console.error(`User: ${formUser} is a invalid user`)
        return false
    }

    if (await userExists(formUser.email)) {
        console.error(`Email ${formUser.email} alredy on use`)
        return false
    }

    if (!(validatePasswords(formUser.password1, formUser.password2))) {
        return false
    }
    return true
}

const registerUser = async (formUser) => {

    if (await userValidation(formUser)) {
        await saveUser(formUser)
        return true
    }
    return false
}

const logInUser = async (userEmail, userPassword, context) => {
    //this function is used when a user is register and when is log in 

    const userRef = getUserRef(userEmail)
    const userSnapshot = await getDoc(userRef)
    if (validateDbPassword(userSnapshot, userPassword)) {
        openUserSession(userRef, userSnapshot, context)
        return true
    }
    return false
}

async function registerAndLogInUser(formUser, context) {

    if (!await registerUser(formUser)) {
        return false
    }

    if (!await logInUser(formUser.email, formUser.password, context)) {
        return false
    }
    return true
}



async function openUserSession(userRef, userSnapshot, context) {

    const newSessionNumber = getNewSessionNumber()

    await updateDoc(userRef, { sessionNumber: newSessionNumber })

    setIntoLocalStorage(sessionNumberKey, newSessionNumber)
    setIntoLocalStorage(userIdKey, userSnapshot.id)

    await saveUserDataInContext(userSnapshot, context)
}

async function closeUserSession(context) {

    const userRef = getUserRef(context.user.email)

    if (userRef) {
        await updateDoc(userRef, { sessionNumber: null })
    }

    setIntoLocalStorage(sessionNumberKey, false)
    setIntoLocalStorage(userIdKey, false)

    await deleteUserDataInContext(context)

}




async function isUserSessionOpen(context) {
    // checks if the user is log in into this computer
    // if its logged into another computer it will close the actual session

    const localSessionNumber = getFromLocalStorage(sessionNumberKey)
    const localUserID = getFromLocalStorage(userIdKey)


    if (localSessionNumber && localUserID) {

        const userRef = getUserRef(localUserID)
        const userSnapshot = await getDoc(userRef)

        if (localSessionNumber == userSnapshot.data().sessionNumber) {

            await saveUserDataInContext(userSnapshot, context)
            await setNewSessionNumber(userRef)
            return true
        }
    }

    return false
}

async function setNewSessionNumber(userRef) {
    const sessionNumber = getNewSessionNumber()
    setIntoLocalStorage(sessionNumberKey, sessionNumber)
    await updateDoc(userRef, { sessionNumber: sessionNumber })
}



// context functions

async function saveUserDataInContext(userFromDb, context) {
    const userData = userFromDb.data()
    await context.setUser({ email: userData.email, name: userData.name })
}

async function deleteUserDataInContext(context) {
    await context.setUser({})
}


// special test function

async function test() {
}





// Functions related to the google acount registraition

const userGoogleRegister = async (user) => {

    if (!userValidation(user)) {
        return false
    }

    const credentials = await saveFirebaseUser(user.email, user.password1)

    const newUser = credentials.user
    await sendEmailVerificationFirabeseUser(newUser)

    return true

}


// functions related to both register sistems
const isUserFirebaseAccount = (userEmail) =>{
    
}
const isUserDocumentAccount = (userEmail) =>{
    return userExists(userEmail)
}

const userIsRegisted = (userEmail) => {
    if (getUserRef(userEmail)) { //|| todo
        return true
    }

    return false
}

const generalLogin = (user, context) => {
    // chech if the user is loged in the normal way

    if (!userIsRegisted(user.email)) {
        return false
        //trow notifications
    }

    return true
}




export {  }