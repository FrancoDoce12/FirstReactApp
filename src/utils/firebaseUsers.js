import { auth } from "../firebase/config"
import { getCurrentFirebaseUser, getFirebaseDocUserByUid, getFirestoreUsersCollectionRef, saveAndRegisterFirebaseUser, sendEmailVerificationFirabeseUser, signInFirebaseUser, singOutFirebaseUser } from "../firebase/utils/firebaseUsers"
import { saveDocCustomId } from "../firebase/utils/main"
import { deleteAllUserDataInContext, deleteUserDataInContext, saveUserDataInContext, saveUserTypeDataInContext, userValidation } from "./main"

const userTypeFirestore = "firestoreUser"


const firebaseUserRegister = async (formUser, context) => {
    if (! await userValidation(formUser)) {
        console.error("Form User Not Validated")
        return false
    }

    const credentials = await saveAndRegisterFirebaseUser(formUser.email, formUser.password1)
    const newUser = credentials.user

    await saveFirebaseUserDoc(formUser, newUser.uid)
    await saveFirebaseUserDataInContext(newUser, context)
    await sendEmailVerificationFirabeseUser(newUser)

    return true
}

const saveFirebaseUserDoc = async (formUser, firebaseUserUid) => {
    const userData = { name: formUser.name, email: formUser.email, password: formUser.password1 }
    await saveDocCustomId(getFirestoreUsersCollectionRef(), firebaseUserUid, userData)
}

const firebaseUserLogin = async (email, password, context) => {
    try {
        const userCredentials = await signInFirebaseUser(email, password)
        const firebaseUser = userCredentials.user
        await saveFirebaseUserDataInContext(firebaseUser, context)
        return true
    } catch (error) {
        console.error('Error en el inicio de sesión:', error)
        return false
    }
}

const firebaseUserSingOut = async (context) => {
    await singOutFirebaseUser()
    await deleteAllUserDataInContext(context)
}

const firebaseTest = async () => {
    const example = getCurrentFirebaseUser()
    console.log(example)
    console.log(example.emailVerified)
}

const saveFirebaseUserDataInContext = async (firebaseUser, context) => {
    const userData = await getFirebaseDocUserByUid(firebaseUser.uid)
    // don t want the password saved into the context
    delete userData.password
    console.log(userData)
    const user = {
        emailVerified: firebaseUser.emailVerified,
        ...userData
    }
    const userType = {
        type: userTypeFirestore,
        verification: firebaseUser.emailVerified
    }
    saveUserDataInContext(user, context)
    saveUserTypeDataInContext(userType, context)
}

const checkFirebaseUser = async (context) => {
    const userTypeObj = {
        validation: false,
        type: undefined
    }
    auth.onAuthStateChanged((firebaseUser) => {
        console.log(firebaseUser,"onAuthStateChanged")

        if (firebaseUser) {
            saveFirebaseUserDataInContext(firebaseUser, context)
            userTypeObj.type = userTypeFirestore
            userTypeObj.validation = firebaseUser.emailVerified
            context.setUserType(userTypeObj)
        }
    })
    return userTypeObj
}

export { firebaseUserRegister, firebaseTest, firebaseUserLogin, firebaseUserSingOut, userTypeFirestore, saveFirebaseUserDataInContext, checkFirebaseUser }

