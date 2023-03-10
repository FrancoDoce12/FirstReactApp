import { getNewSessionNumber, setIntoLocalStorage, getFromLocalStorage, sessionNumberKey, userIdKey, saveUserDataInContext, deleteUserDataInContext } from "./main";
import { getUserRef } from "../firebase/utils/users";


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

    await saveUserDataInContext(userSnapshot.data(), context)
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

            await saveUserDataInContext(userSnapshot.data(), context)
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

const isUserDocumentAccount = (userEmail) => {
    return userExists(userEmail)
}

export { logInUser, registerUser, closeUserSession }