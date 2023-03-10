import { userExists } from "../firebase/utils/users";
import { firebaseUserLogin, firebaseUserSingOut } from "./firebaseUsers";
import { getCurrentUserType } from "./main"
import { closeUserSession, logInUser, verifyUserSession } from "./users";

const closeGeneralUserSession = async (context) => {
    switch (await getCurrentUserType(context)) {
        case "documentUser":
            await closeUserSession(context)
            break;
        case "firestoreUser":
            await firebaseUserSingOut(context)
            break;
        default:
            break;
    }
}

const generalLogIn = async (userEmail, userPassword, context) => {
    if (userExists(userEmail)) {
        return await logInUser(userEmail, userPassword, context)
    } else {
        return await firebaseUserLogin(userEmail, userPassword, context)
    }
}

const checkGeneralUserSession = (context) =>{
    verifyUserSession(context)
    // continue here
}

export { closeGeneralUserSession, generalLogIn }