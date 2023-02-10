import './ItemListContainer.css'
import ItemComponent from '../itemComponent/itemComponent'
import database from '../database'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategories } from '../../firebase/functions'
import { useEffect, useState } from 'react'


function ItemListContainer() {

    const [data, setData] = useState([])
    const [params, setParams] = useState(useParams())

    useEffect(() => {
        async function getData() {
            let dataFromDB
            if (params.category) {
                dataFromDB = getProductsByCategories(params.category)
            }
            else {
                dataFromDB = getProducts()
            }



            setData(await dataFromDB)
        }

        getData()

    }, [])

    if (data.length > 0) {
        return (
            <div className='container-1'>

                {data.map(item => {
                    return (
                        <ItemComponent key={item.id} id={item.id} img_source={item.img_source} alt={item.alt} title={item.title} description={item.description} ></ItemComponent>
                    )
                })}
            </div>
        )
    } else {
        (<h2>loading...</h2>)
    }
}

export default ItemListContainer