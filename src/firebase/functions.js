import { db, auth } from "./config";
import { query, collection, where, doc, getDoc, getDocs, addDoc, updateDoc, fild } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

const usersRoute = "usersDocuments"
const prodcutsRoute = "Productos"

async function getProducts() {
    return (await getDocs(collection(db, prodcutsRoute))).docs.map(item => {
        return { ...item.data(), id: item.id }
    })
}

async function getProductsByCategories(categories) {
    return (await getDocs(query(collection(db, prodcutsRoute), where('categories', 'array-contains-any', [categories])))).docs.map(item => {
        return { ...item.data(), id: item.id }
    })
}

async function getUserByEmail(userEmail) {
    return (await getDocs(query(collection(db, usersRoute), where('email', '==', userEmail)))).docs[0]
}

async function test(userEmail){
    console.log(userEmail)

    await addDoc(collection(db, usersRoute), {
        name: "formUser.name",
        email: userEmail,
        password: "formUser.password1"
    })
    console.log("paso 1")

    let resultado = await getDoc(query(collection(db, usersRoute), where('email', '==', userEmail)))
    console.log(resultado,"resultado")
}


async function getItemById(id, route) {
    return await getDoc(doc(db, `${route}${id}`))
}
async function getUserIdByEmail(userEmail) {
    return (await getUserByEmail(userEmail).id)
}


async function getUserRef(userEmail) {
    let userInDb = await getUserByEmail(userEmail)
    return doc(db, usersRoute, `${userInDb.id}`)
}

function getUserRefByID(userID) {
    return doc(db, `${usersRoute}/${userID}`)
}

async function registerUserInDb(formUser) {

    await addDoc(collection(db, usersRoute), {
        name: formUser.name,
        email: formUser.email,
        password: formUser.password1
    })
}

async function updateUserSessionNumber(userEmail, dataOfSessionNumber) {

    let userRef = await getUserRef(userEmail)
    return await updateDoc(userRef, dataOfSessionNumber)
    
}

// ----------------- functions related to the google user registraition -----------------


const registerUserInFirebase = async (userEmail, userPassword) => {
    return await createUserWithEmailAndPassword(auth, userEmail, userPassword)
}

const getCurrentUser = () => {
    return auth.currentUser
}

const sendEmailVerificationUser = async (user) => {
    return await sendEmailVerification(user)
}
const loginWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(email, password)
        const user = userCredential.user
        console.log('Login exitoso:', user)
        // Realizar acciones adicionales después del inicio de sesión exitoso
    } catch (error) {
        console.error('Error en el inicio de sesión:', error)
    }
}



export { getUserByEmail, getUserIdByEmail, getUserRef, registerUserInDb, updateUserSessionNumber, getUserRefByID, getProducts, getProductsByCategories, getItemById, registerUserInFirebase, getCurrentUser, sendEmailVerificationUser, loginWithEmailAndPassword, test }