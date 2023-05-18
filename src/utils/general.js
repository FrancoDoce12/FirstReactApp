import { updateDoc } from "firebase/firestore";
import { firestireUserExists, getFirebaseUserRefById } from "../firebase/utils/firebaseUsers";
import { getDocDataByRef } from "../firebase/utils/main";
import { getUserRef, userExists } from "../firebase/utils/users";
import { checkFirebaseUser, firebaseUserLogin, firebaseUserSingOut, userTypeFirestore } from "./firebaseUsers";
import { getCurrentUserType, saveUserTypeDataInContext } from "./main"
import { closeUserSession, logInUser, verifyUserSession, userTypeDocument } from "./users";
import { convertDataBaseArray } from "../firebase/utils/main";




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
    context.setUser({})
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

const generalUserExists = async (email) => {
    return (await firestireUserExists(email)) || (await userExists(email))
}

const getGeneralCurrentUserData = async (context) => {
    return await getDocDataByRef(getGeneralCurrentUserRef(context))
}

const getGeneralUserId = (context) => {
    if (context.user) {
        if (context.user.uid) {
            return context.user.uid
        } else {
            context.user.email
        }
    } else return false
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

const deleteCartItem = async (idItem, context) => {
    let userRef = getGeneralCurrentUserRef(context)
    let userData = await getDocDataByRef(userRef)
    let newCart = []
    let oldCart = convertDataBaseArray(userData.cart)
    oldCart.forEach((item) => {
        if (item.id != idItem) {
            newCart.push(item)
        }
    })

    await updateDoc(userRef, { cart: newCart })

    let newUserInfo = {...context.user}
    newUserInfo.cart = newCart
    context.setUser(newUserInfo)

}


export { closeGeneralUserSession, generalLogIn, checkGeneralUserSession, getGeneralCurrentUserRef, getGeneralCurrentUserData, generalUserExists, deleteCartItem }