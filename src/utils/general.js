import { auth } from "../firebase/config";
import { getCurrentFirebaseUser, getFirebaseUserRefById } from "../firebase/utils/firebaseUsers";
import { getDocDataByRef } from "../firebase/utils/main";
import { getUserById, getUserRef, userExists } from "../firebase/utils/users";
import { checkFirebaseUser, firebaseUserLogin, firebaseUserSingOut, saveFirebaseUserDataInContext, userTypeFirestore } from "./firebaseUsers";
import { getCurrentUserType, saveUserTypeDataInContext } from "./main"
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
    if (await userExists(userEmail)) {
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
        const firebaseUserType = await checkFirebaseUser(context)
        data.validation = firebaseUserType.validation
        data.type = firebaseUserType.type
    }

    await saveUserTypeDataInContext(data, context)
    await context.setIsUserSessionCheck(true)

    return data
}

const getGeneralCurrentUserData = async (context) => {
    return await getDocDataByRef(getGeneralCurrentUserRef(context))
}

const getGeneralCurrentUserRef = (context) => {
    if (!context.userType.type) {
        return false
    }
    if (context.userType.type == userTypeDocument) {
        return getUserRef(context.user.email)
    } else {
        return getFirebaseUserRefById(context.user.uid)
    }
}

export { closeGeneralUserSession, generalLogIn, checkGeneralUserSession, getGeneralCurrentUserRef, getGeneralCurrentUserData }