import './RegisterButton.css'
import { Link } from 'react-router-dom'



function RegisterButton(){
    return (
        <Link to={'/Register'}>
        <button className='RegisterButton'>Register Now!</button>
        </Link>
    )
}

export default RegisterButton