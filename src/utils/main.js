import { getDoc, updateDoc } from 'firebase/firestore';
import {  getCurrentFirebaseUser } from '../firebase/utils/firebaseUsers';
import { getUserById, userExists } from '../firebase/utils/users';

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

function getNewSessionNumber() {
    return getRandomNumberBetween(0, Number.MAX_SAFE_INTEGER)
}

// validation of passwords functions

const validatePassword = (password) => {
    // used by all types of users

    // intended to be used just whem the user is being register, why? because if the
    // validation changes over time, the old users will be capables to open session

    // makes more complex password validation here
    if (password) {
        return true
    }
    return false
}

const validateTwoPasswords = (password1, password2) => {
    return password1 == password2
}

function validateRegisterPasswords(password1, password2) {
    if (validatePassword(password1)) {
        return validateTwoPasswords(password1, password2)
    }
    return false
}

const validateDbPassword = (userSnapshot, userPassword) => {
    if (userSnapshot.exist()){
        const userDbPassword = userSnapshot.data().password
        return validateTwoPasswords(userDbPassword, userPassword)
    }
    return false
}

// functions related to both users types

async function userValidation(formUser) {

    if ((!formUser.email) && (!formUser.name) && (!formUser.password1) && (!formUser.password2)) {
        console.error(`User: ${formUser} is a invalid user`)
        return false
    }

    if (await userExists(formUser.email)) {
        console.error(`Email ${formUser.email} alredy on use`)
        return false
    }

    if (!(validateTwoPasswords(formUser.password1, formUser.password2))) {
        return false
    }
    return true
}


const getCurrentUserType = async (context) =>{

    const userEmail = context.user.email
        if (!userEmail) {
            return false
        }
    if (getCurrentFirebaseUser()){
        return 'firestoreUser'
    }
    if ((await userExists(userEmail))){
        return 'documentUser'
    }
    
    return false
}


async function saveUserDataInContext(userData, context) {
    await context.setUser({ email: userData.email, name: userData.name })
}

async function deleteUserDataInContext(context) {
    await context.setUser({})
}





export { setIntoLocalStorage, getFromLocalStorage, getNewSessionNumber, validateRegisterPasswords, validateDbPassword, userValidation, sessionNumberKey, userIdKey, saveUserDataInContext, deleteUserDataInContext, getCurrentUserType }

