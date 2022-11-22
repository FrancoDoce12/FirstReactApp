import './Navbar.css'
import '../carWidget/CarWidget'
import CarWidget from '../carWidget/CarWidget'


function Navbar() {
    return (
        <nav className='navbar'>
            <span className='brand'>Art E-Comerse</span>
            <div className='options'>
                <h6>option 1</h6>
                <h6>option 2</h6>
                <h6>option 3</h6>
                <CarWidget />
            </div>
        </nav>
    )
}

export default Navbar