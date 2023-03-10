import './UserWidget.css'
import Link1 from '../buttons/Link1'
import Button1 from '../buttons/Button1'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/context'
import { useLocation } from 'react-router-dom';
import { closeGeneralUserSession } from '../../utils/general'


function UserWidget() {

    const hide = useLocation().pathname == '/Register'
    // hides the link if it is the path

    let context = useContext(AppContext)

    let userNameToShow 
    if (context.user.name) {
        userNameToShow = context.user.name
    } else {
        userNameToShow = context.user.email
    }


    if (context.isUserSessionCheck) {
        return (
            <>
                {
                    context.user.email ?
                        <>
                            <h3>{`Welcom User ${userNameToShow}`}</h3> <Button1 onClick={() => {
                                closeGeneralUserSession(context)
                            }} >Log out</Button1>
                        </>
                        :
                        <>
                            <Link1 to={'/RegisterOptions'} hide={hide} >Register</Link1>
                            <Link1 to={'/LogIn'} >LogIn</Link1>
                        </>
                }
            </>
        )
    }

    //meake a custom loading element to return
    return (
        <>
        <h3>LOADING...</h3>
        </>
    )





}

export default UserWidget