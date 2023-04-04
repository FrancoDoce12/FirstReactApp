import './itemComponent.css'
import { Link } from 'react-router-dom'




function ItemComponent({ id, img_source, alt = '', title = 'UNDEFINED',  }) {

    let siteSource = process.env.PUBLIC_URL + img_source
    console.log(img_source,"img_source")
    console.log(siteSource,"siteSource")


    return (
        <div className='item_container'>
                <img src={siteSource} alt={alt} />
            <div className='text_container'>
                <h2>{title}</h2>
                <Link to={`/item/${id}`} >
                    <button>Read More!</button>
                </Link>
            </div>
        </div>
    )

}

export default ItemComponent