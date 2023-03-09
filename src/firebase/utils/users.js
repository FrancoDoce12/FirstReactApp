import { getCollection, getDocById, getDocRefById, saveDocCustomId } from "./main"
import { updateDoc } from "firebase/firestore"


const usersRoute = "usersDocuments"



const getUsersCollection = () => {
    return getCollection(usersRoute)
}

const getUserById = async (id) => {
    return await getDocById(usersRoute, id)
}

const userExists = async (userEmail) => {
    const docSnapshot = await getUserById(userEmail)
    return docSnapshot.exists()
}

const getUserRef = (userEmailId) => {
    return getDocRefById(usersRoute, userEmailId)
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

export { userExists, getUserRef, getUserById, saveUser, updateUserSessionNumber }
