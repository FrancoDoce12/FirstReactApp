import './ItemListContainer.css'
import ItemComponent from '../itemComponent/itemComponent'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategories } from '../../firebase/utils/products'
import { useEffect, useState } from 'react'


function ItemListContainer() {

    const params = useParams()
    const [request, setRequest] = useState({ amount: 3, categories: params?.categories })
    const [refData] = useState({ data: [], request, newRequestCompleted: true, lastElement: undefined, allDataGiven: false })

    useEffect(() => {
        async function getData() {
            if (request.amount != refData.data.length || request.categories != params.categories) {
                let dataFromDB = await getProducts(3, params?.category, refData.lastElement)

                if (dataFromDB.length != 0) {

                    refData.data = [...refData.data, ...dataFromDB]
                    refData.request.categories = params.categories
                    refData.request.amount = request.amount
                    refData.lastElement = refData.data[refData.data.length - 1]

                    refData.newRequestCompleted = true

                    // force update
                    setRequest(refData.request)
                } else {
                    refData.allDataGiven = true
                }
            }
        }
        getData()
    }, [params, request])


    const handleScroll = () => {
        if (!refData.allDataGiven) {
            const scrollTop = window.scrollY // actual scroll
            const windowHeight = window.innerHeight
            const scrollHeight = document.documentElement.scrollHeight

            if ((scrollTop + windowHeight + windowHeight / 2) > scrollHeight) {
                if (refData.newRequestCompleted) {
                    refData.newRequestCompleted = false
                    let newRequest = { ...refData.request }
                    newRequest.amount = refData.request.amount + 5
                    setRequest(newRequest)
                }
            }
        }
    }



    window.addEventListener('scroll', handleScroll)



    if (refData.data.length > 0) {
        return (
            <div className='container-1'>

                {refData.data.map(item => {
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