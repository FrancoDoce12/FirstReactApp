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
        const userCredential = await signInFirebaseUser(email, password)
        saveUserDataInContext({ email, password }, context)
        // guardarlo en el contexto
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
    const caca = getCurrentFirebaseUser()
    console.log(caca)
    console.log(caca.emailVerified)
}

const saveFirebaseUserDataInContext = (firebaseUser, context) => {

    const user = {
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName
    }
    context.setUser(user)
}

const checkFirebaseUser = (context) =>{
    const userTypeObj = {
        validation: false,
        type: undefined
    } 
    auth.onAuthStateChanged((firebaseUser)=>{
        if (firebaseUser){
            userTypeObj.type = userTypeFirestore
            userTypeObj.validation = firebaseUser.emailVerified
            saveFirebaseUserDataInContext(firebaseUser,context)
        } 
    })
    return userTypeObj
}

export { firebaseUserRegister, firebaseTest, firebaseUserLogin, firebaseUserSingOut, userTypeFirestore, saveFirebaseUserDataInContext, checkFirebaseUser }

