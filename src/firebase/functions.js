import { db, auth } from "./config";
import { query, collection, where, doc, getDoc, getDocs, addDoc, updateDoc, fild } from "firebase/firestore";


async function getProducts() {
    return (await getDocs(collection(db, 'Productos'))).docs.map(item => {
        return {...item.data(), id: item.id}
    })
}

async function getProductsByCategories(categories) {
    return (await getDocs(query(collection(db, 'Productos'), where('categories', 'array-contains-any', [categories])))).docs.map(item => {
        return {...item.data(), id: item.id}
    })
}

async function getUserByEmail(userEmail) {
    return (await getDocs(query(collection(db, 'Users'), where('email', '==', userEmail)))).docs[0]
}

async function getItemById(id,route) {
    return await getDoc(doc(db, `${route}${id}`))
}
async function getUserIdByEmail(userEmail) {
    return (await getUserByEmail(userEmail).id)
}


async function getUserRef(userEmail) {
    let userInDb = await getUserByEmail(userEmail)
    return doc(db, "Users", `${userInDb.id}`)
}

function getUserRefByID(userID) {
    return doc(db, `Users/${userID}`)
}

async function registerUserInDb(formUser) {

    console.log(formUser, "se esta registrando")

    await addDoc(collection(db, 'Users'), {
        name: formUser.name,
        email: formUser.email,
        password: formUser.password1
    })
}

async function updateUserSessionNumber(userEmail, dataOfSessionNumber) {
    console.log(userEmail)

    let userRef = await getUserRef(userEmail)

    console.log(userRef)

    console.log((await getDoc(userRef)).data())

    let caca = await updateDoc(userRef, dataOfSessionNumber)
    return caca
}



export { getUserByEmail, getUserIdByEmail, getUserRef, registerUserInDb, updateUserSessionNumber, getUserRefByID, getProducts, getProductsByCategories, getItemById }