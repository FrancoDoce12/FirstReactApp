import './UserWidget.css'
import Link1 from '../buttons/Link1'
import Button1 from '../buttons/Button1'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/context'
import { useLocation } from 'react-router-dom';
import { closeGeneralUserSession } from '../../utils/general'
import { userTypeFirestore } from '../../utils/firebaseUsers'
import { userTypeDocument } from '../../utils/users'
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
    console.log(context.userType, "se fija a validacion")
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