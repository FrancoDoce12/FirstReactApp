import './formNotificationContainer.css'
import FormNotification from '../formNotification/formNotification'

import { useEffect, useState } from 'react'
import { isIterable } from '../../utils/functions'



function FormNotificationContainer({notificationMessages = [], children}) {

    const isChildrenIterable = isIterable(children)

    let notifications = []

    let key = 0
    notificationMessages.forEach(message => {

        let notificacionElement = <FormNotification key={key} notificationMessage={message}></FormNotification>
        // let notificacionElement = FormNotification(message,key)
        console.log(notificacionElement.props, "props")
        notifications.push(notificacionElement)
        key++
    })
    console.log(notifications)
    


    
    
    
    useEffect(() => {
        notificationMessages.forEach(element => {
            // crear el elemento notificacion y añadirlo a sus childrends
            // y so no se puede añadir a childrens, añadirlo a otra prop o 
            // state y renderisarlo ahi dentro como se hiso con children
        });
    })
    

    return (
        <div>
            {notifications}
            {children}
        </div>
        )
}

export default FormNotificationContainer