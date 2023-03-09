import { getCollection, getDocById, getDocRefById, saveDocCustomId } from "./main"

const prodcutsRoute = "Productos"


const getProductsCollection = () => {
    return getCollection(prodcutsRoute)
}

const getProductById = async (id) => {
    return await getDocById(prodcutsRoute, id)
}

async function getProducts() {
    return (await getDocs(getProductsCollection())).docs.map(item => {
        return { ...item.data(), id: item.id }
    })
}

async function getProductsByCategories(categories) {
    return (await getDocs(query(getProductsCollection(), where('categories', 'array-contains-any', [categories])))).docs.map(item => {
        return { ...item.data(), id: item.id }
    })
}


export { getProductsByCategories, getProducts, getProductById }