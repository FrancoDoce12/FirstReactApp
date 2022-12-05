import './ItemListContainer.css'

import itemComponent from '../itemComponent/itemComponent'

function ItemListContainer({greetings}) {


    return (
        <div className='container-1'>
            <h1>{greetings}</h1>
            <itemComponent img_source={''} alt= title= description= ></itemComponent>
        </div>
    )
}

export default ItemListContainer