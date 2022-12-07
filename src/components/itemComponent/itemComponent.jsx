import './itemComponent.css'
import {Link} from 'react-router-dom'




function ItemComponent({id ,img_source, alt = '', title = 'UNDEFINED', description = ''}) {


    return (
        <div className='item_container'>
            <img src={img_source} alt={alt} />
            <div className='text_container'>
                <h2>{title}</h2>
                <p>{description}</p>
                <Link to={`/item/${id}`} >
                    <button>Details!</button>
                </Link>
            </div>
        </div>
    )

}

export default ItemComponent