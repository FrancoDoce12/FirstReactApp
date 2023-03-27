import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getFirebaseUserRefById } from "../firebase/utils/firebaseUsers";
import { getDocRefById } from "../firebase/utils/main";
import { addProduct } from "../firebase/utils/products";
import { getUserRef } from "../firebase/utils/users";
import { getGeneralCurrentUserRef } from "./general";
import { userTypeDocument } from "./users";

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

export { createProduct, test }