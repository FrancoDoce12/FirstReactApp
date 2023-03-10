import { getCollectionRef, getDocById, getDocRefById, saveDocCustomId } from "./main"
import { updateDoc } from "firebase/firestore"


const usersRoute = "usersDocuments"



const getUsersCollectionRef = () => {
    return getCollectionRef(usersRoute)
}

const getUserById = async (emailId) => {
    return await getDocById(usersRoute, emailId)
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
    await saveDocCustomId(getUsersCollectionRef(), formUser.email, userData)
}

async function updateUserSessionNumber(userRef, dataOfSessionNumber) {
    return await updateDoc(userRef, dataOfSessionNumber)
}

export { userExists, getUserRef, getUserById, saveUser, updateUserSessionNumber }
