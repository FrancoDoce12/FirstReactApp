import { db, auth } from "../config";
import { getCollection, getDocById, getDocRefById, saveDocCustomId } from "./main"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth"



const firestoreUsersRoute = "users"


const getFirestoreUsersCollection = () => {
    getCollection(firestoreUsersRoute)
}

const getFirebaseUserById = async (id) => {
    getDocById(firestoreUsersRoute, id)
}

const firebaseUserExists = async (id) => {
    // TODO
    // hacer que en base al mail haga esto 
    const docSnapshot = await getFirebaseUserById(id)
    return docSnapshot.exists()
}


const saveAndRegisterFirebaseUser = async (userEmail, userPassword) => {
    return await createUserWithEmailAndPassword(auth, userEmail, userPassword)
}

const getCurrentFirebaseUser = () => {
    return auth.currentUser
}

const sendEmailVerificationFirabeseUser = async (firebaseUser) => {
    // makes more complex email here
    return await sendEmailVerification(firebaseUser)
}

const signInFirebaseUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

const singOutFirebaseUser = async () =>{
    return await signOut(auth)
}

const getFirebaseUserByEmail = async () =>{
    
}


export { firebaseUserExists, saveAndRegisterFirebaseUser, sendEmailVerificationFirabeseUser, signInFirebaseUser, singOutFirebaseUser }