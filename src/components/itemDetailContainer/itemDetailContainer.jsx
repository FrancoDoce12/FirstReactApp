import './itemDetailContainer.css'
import {useParams} from 'react-router-dom'
import database from '../database'
import { getItemById } from '../../firebase/functions'
import { useEffect, useState } from 'react'

function ItemDetailContainer (){

    const params = useParams()

    const [item, setItem] = useState({})

    useEffect(()=>{
        async function getItem(){
            setItem((await getItemById(params.id,"Productos/")).data())
        }
        getItem()
    }, [])

    console.log(item, "item")

    return (
        <div className='item_detail_container'>
            <img src={item.img_source} alt={item.alt} />
            <div className='text_container'>
                <h2>{item.title}</h2>
                <p>{item.desciption}</p>
            </div>
        </div>
    )
}


export default ItemDetailContainer