import './itemDetailContainer.css'
import { useParams } from 'react-router-dom'
import { getProductByRef, getProductRef } from '../../firebase/utils/products'
import { useContext, useEffect, useState } from 'react'
import { getDoc } from 'firebase/firestore'
import UserMiniDetailContainter from '../userMiniDetailContainter/userMiniDetailContainter'
import Link1 from '../buttons/Link1'
import { AppContext } from '../../context/context'
import { buyProduct } from '../../utils/products'
import { getGeneralCurrentUserRef } from '../../utils/general'

function ItemDetailContainer() {

    const params = useParams()
    const context = useContext(AppContext)

    const [item, setItem] = useState({})
    const [itemUserOwner, setItemUserOwner] = useState({})
    const [objRefItem] = useState({ item })


    useEffect(() => {
        objRefItem.item = item
        async function getItemUserOwner() {
            const userRef = objRefItem.item?.userRef
            if (userRef) {
                const userSnapshot = await getDoc(userRef)
                const user = userSnapshot.data()
                setItemUserOwner(user)
            }
        }
        getItemUserOwner()
    }, [item])

    useEffect(() => {
        async function getItem() {
            const itemRef = getProductRef(params.id)
            objRefItem.itemRef = itemRef
            setItem((await getProductByRef(itemRef)).data())
        }
        getItem()
    }, [])

    if (context.user?.userType?.validation) {
        buyButton = <Link1 onClick={() => { }} >Buy Product!</Link1>
    }


    if (item) {
        return (
            <div className='item_detail_container'>
                <img src={item.img_source} alt={item.alt} />
                <div className='text_container'>
                    <h2>{item.title}</h2>
                    <p>{item.desciption}</p>
                    <UserMiniDetailContainter title={"Created by:"} user={itemUserOwner}></UserMiniDetailContainter>
                    <Link1 onClick={() => {
                        buyProduct(objRefItem.itemRef, getGeneralCurrentUserRef(context),context)
                    }} to={"/cartView"} >Buy Product!</Link1>
                </div>
            </div>
        )
    }
    return (<><h1>ERROR ITEM NOT FUND</h1></>)
}


export default ItemDetailContainer