import { addProduct } from "../firebase/utils/products";
import { getUserRef } from "../firebase/utils/users";
import { getGeneralCurrentUserRef } from "./general";
import { userTypeDocument } from "./users";

const validateProduct = (product) => {
    if (!(product.title && product.img_source && product.description && product.alt)) {
        return false
    }
    Object.values(product).forEach(value => {
        if (value === ""){
        console.error(value,"is invalid in product validation")
        return false
    }
    })
    return true
}

const createProduct = async (product, context) => {
    if (!context.userType.type) {
        return false
    }
    if (!validateProduct(product)) {
        console.log("no se valido la verga")
        return false
    }

    const categories = Object.values(product.categories)
    delete product.categories

    const userRef = getGeneralCurrentUserRef(context)
    const creationDate = new Date()
    const productData = {
        ...product,
        categories,
        userRef,
        creationDate
    }
    await addProduct(productData)
    console.log(productData)
    return true
}

export { createProduct }