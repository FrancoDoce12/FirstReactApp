import { addDoc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"
import { getCollectionRef, getDocById, getDocRefById } from "./main"

const prodcutsRoute = "Productos"


const getProductsCollectionRef = () => {
    return getCollectionRef(prodcutsRoute)
}

const getProductById = async (id) => {
    return await getDocById(prodcutsRoute, id)
}

async function getProducts(limits, categories, lastElement) {
    let queryConstraint = [orderBy("title"), limit(limits)]
    if (lastElement) {
        queryConstraint.push(startAfter(lastElement?.title))
    }
    if (categories) {
        queryConstraint.push(where('categories', 'array-contains-any', [categories]))
    }

    let q = query(getProductsCollectionRef(), ...queryConstraint)

    let data = (await getDocs(q)).docs.map(item => {
            return { ...item.data(), id: item.id }
        })
    
    return data
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