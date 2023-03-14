import { db, auth } from "../config";
import { query, collection, where, doc, getDoc, getDocs, addDoc, updateDoc, fild, setDoc } from "firebase/firestore";


const getDocRefById = (collectionRute, docId) => {
    return doc(db, `${collectionRute}/${docId}`)
}

const getDocById = async (collectionRute, docId) => {
    return await getDoc(getDocRefById(collectionRute, docId))
}

const saveDocCustomId = async (collection, customId, documentData = {}) => {
    console.log("antes del desastre")
    let docuRef = doc(collection, customId)
    await setDoc(docuRef, documentData)
}

const getCollectionRef = (colllectionRoute) => {
    return collection(db, colllectionRoute)
}

const test = (argument) => {

}


export { getCollectionRef, getDocRefById, getDocById, saveDocCustomId }