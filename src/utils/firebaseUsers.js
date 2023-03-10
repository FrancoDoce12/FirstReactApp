import { getCurrentFirebaseUser, saveAndRegisterFirebaseUser, sendEmailVerificationFirabeseUser, signInFirebaseUser, singOutFirebaseUser } from "../firebase/utils/firebaseUsers"
import { deleteUserDataInContext, saveUserDataInContext, userValidation } from "./main"


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
        saveUserDataInContext({email, password}, context)
        // guardarlo en el contexto
        return true
    } catch (error) {
        console.error('Error en el inicio de sesión:', error)
        // notificar el error
        return false
    }
}

const firebaseUserSingOut = async (context) =>{
    await singOutFirebaseUser()
    await deleteUserDataInContext(context)
}

const firebaseTest = async () =>{
    const caca = getCurrentFirebaseUser()
    console.log(caca)
    console.log(caca.emailVerified)
}

export {firebaseUserRegister, firebaseTest, firebaseUserLogin, firebaseUserSingOut}

