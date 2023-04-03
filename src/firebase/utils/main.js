import { db } from "../config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";


const getDocRefById = (collectionRute, docId) => {
    return doc(db, `${collectionRute}/${docId}`)
}

const getDocById = async (collectionRute, docId) => {
    return await getDoc(getDocRefById(collectionRute, docId))
}

const saveDocCustomId = async (collection, customId, documentData = {}) => {
    let docuRef = doc(collection, customId)
    await setDoc(docuRef, documentData)
}

const getCollectionRef = (colllectionRoute) => {
    return collection(db, colllectionRoute)
}

const getDocIdByRef = async (docRef) => {
    return (await getDoc(docRef)).id
}

const getDocDataByRef = async (docRef) => {
    return await (await getDoc(docRef)).data()
}

const getDocDataByRefWithId = async (docRef) => {
    const docSnapshot = await getDoc(docRef)
    const docData = await docSnapshot.data()
    return { ...docData, id: docSnapshot.id }
}

// transform the firestore array data into a readeble javascript array
const convertDataBaseArray = (dbArray) => {
    if (dbArray) {
        return Object.keys(dbArray).map(key => dbArray[key])
    } else {
        return []
    }
}

const test = (argument) => {

}


export { getCollectionRef, getDocRefById, getDocById, saveDocCustomId, getDocDataByRef, getDocDataByRefWithId, getDocIdByRef, convertDataBaseArray }