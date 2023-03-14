import { auth } from "../firebase/config";
import { getCurrentFirebaseUser } from "../firebase/utils/firebaseUsers";
import { userExists } from "../firebase/utils/users";
import { checkFirebaseUser, firebaseUserLogin, firebaseUserSingOut, saveFirebaseUserDataInContext, userTypeFirestore } from "./firebaseUsers";
import { getCurrentUserType } from "./main"
import { closeUserSession, logInUser, verifyUserSession, userTypeDocument } from "./users";




const closeGeneralUserSession = async (context) => {
    switch (await getCurrentUserType(context)) {
        case userTypeDocument:
            await closeUserSession(context)
            break;
        case userTypeFirestore:
            await firebaseUserSingOut(context)
            break;
        default:
            break;
    }
    context.setUserType({ validation: false, type: undefined })
}

const generalLogIn = async (userEmail, userPassword, context) => {
    await closeGeneralUserSession(context)
    if (userExists(userEmail)) {
        return await logInUser(userEmail, userPassword, context)
    } else {
        return await firebaseUserLogin(userEmail, userPassword, context)
    }
}

const checkGeneralUserSession = async (context) => {

    // just this declaration to know how is the object
    let data = {
        validation: false,
        type: undefined
    }

    const documentUser = await verifyUserSession(context)
    if (documentUser) {
        data.validation = true
        data.type = userTypeDocument
    } else {
        const firebaseUser = await checkFirebaseUser(context)
        data.validation = firebaseUser.validation
        data.type = firebaseUser.type
        console.log(firebaseUser, "firebaseUser")
    }

    console.log(documentUser, "documentUser")
    

    
    console.log(data.type, "data.type del firebase user")

    context.setUserType(data)
    context.setIsUserSessionCheck(true)

    return data
}

export { closeGeneralUserSession, generalLogIn, checkGeneralUserSession }