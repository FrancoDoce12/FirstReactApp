import './itemDetailContainer.css'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../firebase/utils/products'
import { useEffect, useState } from 'react'
import { getDoc } from 'firebase/firestore'
import UserMiniDetailContainter from '../userMiniDetailContainter/userMiniDetailContainter'

function ItemDetailContainer() {

    const params = useParams()

    const [item, setItem] = useState({})
    const [user, setUser] = useState({})
    const [itemRef] = useState({ item })


    useEffect(() => {
        itemRef.item = item
        async function getUser() {
            const userRef = itemRef.item?.userRef
            if (userRef) {
                const userSnapshot = await getDoc(userRef)
                const user = userSnapshot.data()
                setUser(user)
            }
        }
        getUser()
    }, [item])

    useEffect(() => {
        async function getItem() {
            setItem((await getProductById(params.id)).data())
        }
        getItem()
    }, [])


    if (item) {
        return (
            <div className='item_detail_container'>
                <img src={item.img_source} alt={item.alt} />
                <div className='text_container'>
                    <h2>{item.title}</h2>
                    <p>{item.desciption}</p>
                    <UserMiniDetailContainter title={"Created by:"} user={user}></UserMiniDetailContainter>
                </div>
            </div>
        )
    } 
    return (<><h1>ERROR ITEM NOT FUND</h1></>)
}


export default ItemDetailContainer