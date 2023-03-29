import { getDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../context/context"
import { getDocDataByRef, getDocDataByRefWithId } from "../../firebase/utils/main"
import { getGeneralCurrentUserData, getGeneralCurrentUserRef } from "../../utils/general"
import Link1 from "../buttons/Link1"
import ItemComponent from "../itemComponent/itemComponent"

const CartView = () => {


    const context = useContext(AppContext)
    const [items, setItems] = useState(false)


    // this useEffect waits until the user have a cart and then it add the list of
    // items into the state
    useEffect(() => {
        async function getItems() {
            const cart = context.user.cart
            const itemsData = []
            for (let item = 0; item < cart.length; item++) {
                const itemRef = cart[item];
                const itemData = await getDocDataByRefWithId(itemRef)
                itemsData.push(itemData)
            }
            setItems(itemsData)
            
        }
        if (context.user?.cart) {
            getItems()
        }
    }, [context])


    let itemsList 
    if ((items) && (items.length > 0)) {
        itemsList = (

            <>
                {items.map(item => {
                    return (
                        <ItemComponent key={item.id} id={item.id} img_source={item.img_source} alt={item.alt} title={item.title} ></ItemComponent>
                    )
                })}
            </>
        )
    } else {
        itemsList = (
            <>
                <h2>There are no items in your cart!</h2>
                <Link1 to={"/"} >Buy some items!</Link1>
            </>
        )
    }

    return (
        <>
            <h1>This is your cart list</h1>
            {itemsList}
        </>
    )
}

export default CartView