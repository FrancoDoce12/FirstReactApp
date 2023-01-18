import { db, auth } from "./config";
import { query, collection, where, doc, getDoc, getDocs, addDoc, updateDoc, fild } from "firebase/firestore";


async function getUserByEmail(userEmail) {
    return (await getDocs(query(collection(db, 'Users'), where('email', '==', userEmail)))).docs[0]
}

async function getUserById(id) {
    return await getDoc(doc(db, `Users/${id}`))
}
async function getUserIdByEmail(userEmail) {
    return (await getUserByEmail(userEmail).id)
}


async function getUserRef(userEmail) {
    let userInDb = await getUserByEmail(userEmail)
    return doc(db, "Users", `${userInDb.id}`)
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



export { getUserByEmail, getUserIdByEmail, getUserRef, registerUserInDb, updateUserSessionNumber }