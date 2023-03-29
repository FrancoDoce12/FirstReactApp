import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore"
import { getCollectionRef, getDocById, getDocRefById, saveDocCustomId } from "./main"

const prodcutsRoute = "Productos"


const getProductsCollectionRef = () => {
    return getCollectionRef(prodcutsRoute)
}

const getProductById = async (id) => {
    return await getDocById(prodcutsRoute, id)
}

async function getProducts() {
    return (await getDocs(getProductsCollectionRef())).docs.map(item => {
        return { ...item.data(), id: item.id }
    })
}

async function getProductsByCategories(categories) {
    return (await getDocs(query(getProductsCollectionRef(), where('categories', 'array-contains-any', [categories])))).docs.map(item => {
        return { ...item.data(), id: item.id }
    })
}

const addProduct = async (product) => {
    await addDoc(getProductsCollectionRef(), product)
}

const getProductRef = (productId) => {
    return getDocRefById(prodcutsRoute, productId)
}

const getProductByRef = async (productRef) => {
    return await getDoc(productRef)
}


export { getProductsByCategories, getProducts, getProductById, addProduct, getProductRef, getProductByRef }