import { saveAndRegisterFirebaseUser, sendEmailVerificationFirabeseUser, signInFirebaseUser, sign, singOutFirebaseUser } from "../firebase/utils/firebaseUsers"
import { deleteUserDataInContext, userValidation } from "./main"


const firebaseUserRegister = async (user) => {
    if (!userValidation(user)) {
        return false
    }

    const credentials = await saveAndRegisterFirebaseUser(user.email, user.password1)
    const newUser = credentials.user
    await sendEmailVerificationFirabeseUser(newUser)

    return true
}

const firebaseUserLogin = async (email, password) => {
    try {
        const userCredential = await signInFirebaseUser(email, password)
        // Realizar acciones adicionales después del inicio de sesión exitoso
        // guardarlo en el contexto
        return true
    } catch (error) {
        console.error('Error en el inicio de sesión:', error)
        // notificar el error
        return false
    }
}

const firebaseUserSingOut = async () =>{
    await singOutFirebaseUser()
    await deleteUserDataInContext()
}

export {firebaseUserRegister}

