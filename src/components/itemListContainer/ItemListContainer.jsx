import './ItemListContainer.css'
import ItemComponent from '../itemComponent/itemComponent'
import database from '../database'
import {useParams} from 'react-router-dom'

function ItemListContainer({greetings}) {

    let data

    const params = useParams()
    console.log(params)

    if (params.category){
        data = database.filter(item => item.categores.includes(params.category))
    }
    else {
        data = database
    }

    return ( 
        <div className='container-1'>
            <h1>{greetings}</h1>

            {data.map(item => 
                <ItemComponent id={item.id} img_source={item.img_source} alt={item.alt} title={item.title} description={item.description} ></ItemComponent>
            )}
        </div>
    )
}

export default ItemListContainer