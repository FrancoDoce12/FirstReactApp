import { useContext } from 'react'
import { AppContext } from '../../context/context'
import Link1 from '../buttons/Link1'
import './CarWidget.css'
import shoppingCartImg from '../../../public/assets/imgs/shoppingcar.png';


function CarWidget() {

    const context = useContext(AppContext)

    let cartCount 
    if (context.cartCount){
        cartCount = context.cartCount
    } else{
        cartCount = 0
    }

    return (
        <div className='car-widget'>
            <Link1 to={"/cartView"} >
                <img className='shopping-car' src={shoppingCartImg} alt="a shopping car png" />
                <p>{cartCount}</p>
            </Link1>
        </div>
    )
}


export default CarWidget