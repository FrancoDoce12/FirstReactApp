import { auth } from "../firebase/config"
import { getCurrentFirebaseUser, saveAndRegisterFirebaseUser, sendEmailVerificationFirabeseUser, signInFirebaseUser, singOutFirebaseUser } from "../firebase/utils/firebaseUsers"
import { deleteUserDataInContext, saveUserDataInContext, userValidation } from "./main"

const userTypeFirestore = "firestoreUser"


const firebaseUserRegister = async (formUser) => {
    if (!userValidation(formUser)) {
        return false
    }

    const credentials = await saveAndRegisterFirebaseUser(formUser.email, formUser.password1)
    const newUser = credentials.user
    await sendEmailVerificationFirabeseUser(newUser)

    return true
}

const firebaseUserLogin = async (email, password, context) => {
    try {
        const userCredentials = await signInFirebaseUser(email, password)
        const user = userCredentials.user
        saveFirebaseUserDataInContext(user, context)
        // guardarlo en el contexto
        console.log("queee")
        return true
    } catch (error) {
        console.error('Error en el inicio de sesión:', error)
        // notificar el error
        return false
    }
}

const firebaseUserSingOut = async (context) => {
    await singOutFirebaseUser()
    await deleteUserDataInContext(context)
}

const firebaseTest = async () => {
    const example = getCurrentFirebaseUser()
    console.log(example)
    console.log(example.emailVerified)
}

const saveFirebaseUserDataInContext = (firebaseUser, context) => {
    // normalisation
    const user = {
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        name: firebaseUser.displayName
    }
    saveUserDataInContext(user,context)
}

const checkFirebaseUser = async (context) => {
    const userTypeObj = {
        validation: false,
        type: undefined
    }
    auth.onAuthStateChanged((firebaseUser) => {

        if (firebaseUser) {
            saveFirebaseUserDataInContext(firebaseUser, context)
            userTypeObj.type = userTypeFirestore
            userTypeObj.validation = firebaseUser.emailVerified
            context.setUserType(userTypeObj)
            console.log("onAuthStateChanged AAAAAAAAAAAAAAAAAAAAAAAAAA")
        }
    })
    return userTypeObj
}

export { firebaseUserRegister, firebaseTest, firebaseUserLogin, firebaseUserSingOut, userTypeFirestore, saveFirebaseUserDataInContext, checkFirebaseUser }

