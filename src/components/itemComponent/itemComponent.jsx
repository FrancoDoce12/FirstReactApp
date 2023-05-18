import './itemComponent.css'
import { Link } from 'react-router-dom'
import CancelButton from '../buttons/cancelButton/cancelButton'




function ItemComponent({ id, img_source, alt = '', title = 'UNDEFINED', cancelButton = false, cancelCallBack = ()=>{} }) {

    if (cancelButton){
        cancelButton = (
            <div>
                <CancelButton onClick={cancelCallBack}>
                    x
                </CancelButton>
            </div>
        )
    } else {
        cancelButton = <></>
    }
    

    return (
        <div className='item_container'>
                <img src={img_source} alt={alt} />
            <div className='text_container'>
                <h2>{title}</h2>
                <Link to={`/item/${id}`} >
                    <button>Read More!</button>
                </Link>
            </div>
            {cancelButton}
        </div>
    )

}

export default ItemComponent