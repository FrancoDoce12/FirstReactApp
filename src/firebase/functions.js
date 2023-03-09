import { db, auth } from "./config";
import { query, collection, where, doc, getDoc, getDocs, addDoc, updateDoc, fild, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

const usersRoute = "usersDocuments"
const firestoreUsersRoute = "users"
const prodcutsRoute = "Productos"

// i am not sure if the next 3 functions are totally needed

const testFirestoreFunctions = async () => {
    const collectionQuery = await getDocs(collection(db, firestoreUsersRoute))
    console.log(collectionQuery.docs)

}

const getCollection = (colllectionRoute) => {
    return collection(db, colllectionRoute)
}

const getProductsCollection = () => {
    return getCollection(prodcutsRoute)
}

const getUsersCollection = () => {
    return getCollection(usersRoute)
}

const getFirestoreUsersCollection = () =>{
    getCollection(firestoreUsersRoute)
}

const getDocRefById = (collectionRute, docId) => {
    return doc(db, `${collectionRute}/${docId}`)
}

const getDocById = async (collectionRute, docId) => {
    return await getDoc(getDocRefById(collectionRute, docId))
}

const getProductById = async (id) => {
    return await getDocById(prodcutsRoute, id)
}

const getUserById = async (id) => {
    return await getDocById(usersRoute, id)
}

const getFirebaseUserById = async (id) => {
    getDocById(firestoreUsersRoute,id)
}

const userExists = async (userEmail) => {
    const docSnapshot = await getUserById(userEmail)
    return docSnapshot.exists()
}

const firebaseUserExists = async (id) => {
    const docSnapshot = await getFirebaseUserById(id)
    return docSnapshot.exists()
}

async function getProducts() {
    return (await getDocs(getProductsCollection())).docs.map(item => {
        return { ...item.data(), id: item.id }
    })
}

async function getProductsByCategories(categories) {
    return (await getDocs(query(getProductsCollection(), where('categories', 'array-contains-any', [categories])))).docs.map(item => {
        return { ...item.data(), id: item.id }
    })
}




const getUserRef = (userEmailId) => {
    return getDocRefById(usersRoute, userEmailId)
}

const saveDocCustomId = async (collection, customId, documentData = {}) => {
    let document = doc(collection, customId)
    await setDoc(document, documentData)
}


async function saveUser(formUser) {
    const userData = {
        password: formUser.password1,
        name: formUser.name,
        email: formUser.email
    }
    await saveDocCustomId(getUsersCollection(), formUser.email, userData)
}

async function updateUserSessionNumber(userRef, dataOfSessionNumber) {
    return await updateDoc(userRef, dataOfSessionNumber)
}

// ----------------- functions related to the google user registraition -----------------


const saveAndRegisterFirebaseUser = async (userEmail, userPassword) => {
    return await createUserWithEmailAndPassword(auth, userEmail, userPassword)
}

const getCurrentFirebaseUser = () => {
    return auth.currentUser
}

const sendEmailVerificationFirabeseUser = async (firebaseUser) => {
    return await sendEmailVerification(firebaseUser)
}
const loginFirebaseUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(email, password)
        const user = userCredential.user
        console.log('Login exitoso:', user)
        // Realizar acciones adicionales después del inicio de sesión exitoso
    } catch (error) {
        console.error('Error en el inicio de sesión:', error)
    }
}



async function test(customId) {
    saveDocCustomId(getUsersCollection(), customId)
}

export { userExists, getUserRef, saveUser, getProducts, getProductById, getProductsByCategories, testFirestoreFunctions }