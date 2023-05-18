import { getDoc, updateDoc } from "firebase/firestore";
import { convertDataBaseArray, getDocDataByRefWithId, getDocIdByRef } from "../firebase/utils/main";
import { addProduct } from "../firebase/utils/products";
import { getGeneralCurrentUserRef } from "./general";

const validateProduct = (product) => {
    if (!(product.title && product.img_source && product.description && product.alt)) {
        return false
    }
    Object.values(product).forEach(value => {
        if (value === "") {
            console.error(value, "is invalid in product validation")
            return false
        }
    })
    return true
}

async function test(context) {
    let userRef = getGeneralCurrentUserRef(context)
    if (userRef) {
        let snapshot = await getDoc(userRef)
        let data = snapshot.data()
        let exists = snapshot.exists()
    }

}

const createProduct = async (product, context) => {
    if (!context.userType.type) {
        return false
    }
    if (!validateProduct(product)) {
        return false
    }


    if (product.categories) {
        product.categories = Object.values(product.categories)
    }

    const userRef = getGeneralCurrentUserRef(context)
    const creationDate = new Date()
    const productData = {
        ...product,
        userRef,
        creationDate
    }
    await addProduct(productData)
    return true
}

const buyProduct = async (productRef, context) => {

    const userRef = getGeneralCurrentUserRef(context)
    const productData = await getDocDataByRefWithId(productRef)
    const userData = await getDocDataByRefWithId(userRef)
    if ((!productData) && (!userData)) {
        return false
    }


    // You can t not buy your own product (userId == itemOwnerId)
    const userId = userData.id
    delete userData.id
    const productDataId = productData.id
    delete productData.id
    let itemOwnerId = 0
    if (productData.userRef) {
        itemOwnerId = await getDocIdByRef(productData.userRef)
    }

    // You can t not buy your own product (userId == itemOwnerId)
    if (userId == itemOwnerId) {
        return false
    }

    // you can t not buy somthing that you alredy buy
    const currentCartIds = []
    const userCurrentCart = convertDataBaseArray(userData.cart)
    for (let ref = 0; ref < userCurrentCart.length; ref++) {
        const itemRef = userCurrentCart[ref]
        currentCartIds.push(await getDocIdByRef(itemRef))
    }
    // you can t not buy somthing that you alredy buy
    if (currentCartIds.includes(productDataId)) {
        return false
    }


    const newCart = [...userCurrentCart, productRef]
    await updateDoc(userRef, { cart: newCart })
    // context.setCartCount(context.CartCount + 1)

    const newUserData = userData
    newUserData.cart = newCart
    context.setUser(newUserData)

    return true
}

export { createProduct, buyProduct }