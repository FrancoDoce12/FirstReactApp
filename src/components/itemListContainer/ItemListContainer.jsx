import './ItemListContainer.css'
import ItemComponent from '../itemComponent/itemComponent'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../firebase/utils/products'
import { useEffect, useState } from 'react'


function ItemListContainer() {

    const loadAmaunt = 3
    const params = useParams()
    const [data, setData] = useState([])
    const [refData] = useState({
        newRequestCompleted: true, lastElement: undefined, noMoreData: false,
        previusData: []
    })

    refData.newRequestCompleted = true


    async function getData(deleteOldData) {
        if (refData.newRequestCompleted) {
            refData.newRequestCompleted = false
            let productsData = await getProducts(loadAmaunt, params.categories, refData.lastElement)
            if (deleteOldData) {
                setData(productsData)
                refData.previusData = productsData
            } else {
                let newData = [...refData.previusData, ...productsData]
                setData(newData)
                refData.previusData = newData

            }
            if (productsData.length == 0) {
                refData.noMoreData = true
            } else {
                refData.lastElement = productsData[productsData.length - 1]
            }
        }
    }


    useEffect(() => {
        getData(true)
    },[])



    useEffect(() => {
        refData.lastElement = undefined
        refData.noMoreData = false
        refData.previusData = []
        getData(true)
    }, [params])


    const handleScroll = () => {
        if (!refData.noMoreData && refData.newRequestCompleted) {
            const scrollTop = window.scrollY // actual scroll
            const windowHeight = window.innerHeight
            const scrollHeight = document.documentElement.scrollHeight

            if ((scrollTop + windowHeight + windowHeight / 2) > scrollHeight) {
                getData(false)
            }
        }
    }



    window.addEventListener('scroll', handleScroll)



    if (data.length > 0) {
        return (
            <div className='container-1'>

                {data.map(item => {
                    return (
                        <ItemComponent key={item.id} id={item.id} img_source={item.img_source} alt={item.alt} title={item.title} ></ItemComponent>
                    )
                })}
            </div>
        )
    } else {
        (<h2>loading...</h2>)
    }
}

export default ItemListContainer