import { auth } from "../config";
import { getCollectionRef, getDocById, getDocRefById } from "./main"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getDocs, limit, query, where } from "firebase/firestore";


const firestoreUsersRoute = "users"

// need some api rest for using the firestore auth users info, i need the firestore-admin


const getFirestoreUsersCollectionRef = () => {
    return getCollectionRef(firestoreUsersRoute)
}

const getFirebaseUserByUid = async (id) => {
    // need api rest for things like that
    // return await getDocById(firestoreUsersRoute, id)
}

// const firebaseUserExists = async (id) => {
//     // TODO
//     const docSnapshot = await getFirebaseUserById(id)
//     return docSnapshot.exists()
// }


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

const singOutFirebaseUser = async () => {
    return await signOut(auth)
}

const getFirebaseDocUserByUid = async (Uid) => {
    return await getDocById(firestoreUsersRoute, Uid)
}

const getFirebaseUserRefById = (Uid) => {
    return getDocRefById(firestoreUsersRoute, Uid)
}

const firestireUserExists = async (email) => {
    const collectionRef = getFirestoreUsersCollectionRef()
    const queryRequest = query(collectionRef, where('email', '==', email), limit(1))
    const documentsSnapshot = await getDocs(queryRequest)
    return (!documentsSnapshot.empty)
}


export { getCurrentFirebaseUser, saveAndRegisterFirebaseUser, sendEmailVerificationFirabeseUser, signInFirebaseUser, singOutFirebaseUser, getFirestoreUsersCollectionRef, getFirebaseDocUserByUid, getFirebaseUserRefById,firestireUserExists }