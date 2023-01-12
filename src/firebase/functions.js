import { db, auth } from "./config";
import { query, collection, where, doc, getDoc, getDocs } from "firebase/firestore";


async function getUserByEmail(userEmail) {
    return (await getDocs(query(collection(db, 'Users'), where('email', '==', userEmail)))).docs[0]
}

async function getUserById(id){
    return await getDoc(doc(db, `Users/${id}`))
}
async function getUserIdByEmail(userEmail) {
    return (await getUserByEmail(userEmail).id)
}

async function getUserRef(userEmail) {
    return doc(db, `Users/${await getUserByEmail(userEmail).id}`)
}


export {getUserByEmail, getUserIdByEmail, getUserRef }