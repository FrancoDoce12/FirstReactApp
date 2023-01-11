import './UserButton.css'
import RegisterButton from '../registerButton/RegisterButton'
import { useContext, useState } from 'react'
import { AppContext } from '../../context/context'

function UserButton() {

    
    let context = useContext(AppContext)
    
    

    const [isShowButton, setisShowButton] = useState(true)
    

    return (
        <>
        {
            context.isUserRegister? <h3>User is Register</h3> : <RegisterButton></RegisterButton>
        }
        </>
    )


}

export default UserButton