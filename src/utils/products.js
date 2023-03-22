import { addProduct } from "../firebase/utils/products";
import { getUserRef } from "../firebase/utils/users";
import { getGeneralCurrentUserRef } from "./general";
import { userTypeDocument } from "./users";

const validateProduct = (product) => {
    if (product) return true
}

const createProduct = async (product, context) => {
    if (!context.userType.type) {
        return false
    }
    if (!validateProduct(product)) {
        return false
    }
    const userRef = getGeneralCurrentUserRef(context)
    const productData = {
        ...product,
        userRef
    }
    await addProduct(productData)

}

export { createProduct }