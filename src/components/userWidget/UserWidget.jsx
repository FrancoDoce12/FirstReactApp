import './UserWidget.css'
import Link1 from '../buttons/Link1'
import { useContext } from 'react'
import { AppContext } from '../../context/context'
import { userTypeFirestore } from '../../utils/firebaseUsers'
import LogOutButton from '../buttons/logOutButton'


function UserWidget() {

    let context = useContext(AppContext)

    let userNameToShow
    if (context.user.name) {
        userNameToShow = context.user.name
    } else {
        userNameToShow = context.user.email
    }

    let component
    if (context.userType.validation) {
        component = (
            <>
                <h5>{`Welcom User ${userNameToShow}`}</h5>
                <LogOutButton context={context} />
                <Link1 to ={'/CreateNewProduct'}>Create Your Own Product</Link1>
            </>
        )
    } else if (context.userType.type == userTypeFirestore) {
        component = (
            <>
                <h3>{`your email "${context.user.email}" is not verifieded`}</h3>
                <LogOutButton context={context} />
                <Link1 to={'/RegisterOptions'}  >Register</Link1>
                <Link1 to={'/LogIn'} >LogIn</Link1>
            </>
        )
    } else {
        component = (
            <>
                <Link1 to={'/RegisterOptions'}  >Register</Link1>
                <Link1 to={'/LogIn'} >LogIn</Link1>
            </>
        )
    }


    if (context.isUserSessionCheck) {
        return component
    }

    //meake a custom loading element to return
    return (
        <>
            <h3>LOADING...</h3>
        </>
    )





}

export default UserWidget