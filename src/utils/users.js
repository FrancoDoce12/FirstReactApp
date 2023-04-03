import { getDoc, updateDoc } from "firebase/firestore";
import { getNewSessionNumber, setIntoLocalStorage, getFromLocalStorage, sessionNumberKey, userIdKey, saveUserDataInContext, validateDbPassword, userValidation, saveUserTypeDataInContext, deleteAllUserDataInContext } from "./main";
import { getUserRef, saveUser } from "../firebase/utils/users";

const userTypeDocument = "documentUser"


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

    if (!await logInUser(formUser.email, formUser.password1, context)) {
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
    await saveUserTypeDataInContext({type: userTypeDocument, validation: true}, context)
}

async function closeUserSession(context) {

    const userRef = getUserRef(context.user.email)
    const userSnapshot = getDoc(userRef)


    if ((await userSnapshot).exists()) {
        await updateDoc(userRef, { sessionNumber: null })
    }

    setIntoLocalStorage(sessionNumberKey, false)
    setIntoLocalStorage(userIdKey, false)
    await deleteAllUserDataInContext(context)
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




async function verifyUserSession(context) {

    const localSessionNumber = getFromLocalStorage(sessionNumberKey)
    const localUserEmailID = getFromLocalStorage(userIdKey)
    
    
    if (localSessionNumber && localUserEmailID) {
        
        const userRef = getUserRef(localUserEmailID)
        const userSnapshot = await getDoc(userRef)
        
        if (localSessionNumber == userSnapshot.data().sessionNumber) {
            
            await saveUserDataInContext(userSnapshot.data(), context)
            await setNewSessionNumber(userRef)
            
            return true // returns true becouse the session was verify succsesfuly
        }
        
    }
    await closeUserSession(context)
    context.setIsUserSessionCheck(true)

    return false
}




export { logInUser, registerUser, closeUserSession, verifyUserSession, userTypeDocument, registerAndLogInUser }