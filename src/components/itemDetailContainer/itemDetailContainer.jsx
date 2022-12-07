import './itemDetailContainer.css'
import {useParams} from 'react-router-dom'
import database from '../database'

function ItemDetailContainer (){

    const params = useParams()

    let item = database.filter(item => item.id == params.id)[0]
    console.log(item)

    return (
        <div className='item_detail_container'>
            <img src={item.img_source} alt={item.alt} />
            <div className='text_container'>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
            </div>
        </div>
    )
}


export default ItemDetailContainer