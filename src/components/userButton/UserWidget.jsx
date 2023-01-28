import './UserWidget.css'
import Link1 from '../buttons/Link1'
import Button1 from '../buttons/Button1'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/context'
import { closeUserSession } from '../../utils/functions'
import { useLocation } from 'react-router-dom';



function UserWidget() {

    const hide = useLocation().pathname == '/Register'

    let context = useContext(AppContext)


    if (context.isUserSessionCheck) {
        return (
            <>
                {
                    context.user.name ?
                        <><h3>{`Welcom User ${context.user.name}`}</h3> <Button1 onClick={() => {
                            closeUserSession(context)
                        }} >Log out</Button1> </>
                        :
                        <Link1 to={'/Register'} hide={hide} >Register</Link1>
                    // <Button1 link={'/Register'} >Submit Registration</Button1>
                }
            </>
        )
    }

    //thean return a loading element
    return (
        <>
        </>
    )





}

export default UserWidget