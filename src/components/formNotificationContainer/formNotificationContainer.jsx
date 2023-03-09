import './formNotificationContainer.css'
import FormNotification from '../formNotification/formNotification'

import { useEffect, useState } from 'react'



function FormNotificationContainer({ notificationMessages = [], children }) {

    let notifications = []

    let key = 0
    notificationMessages.forEach(message => {

        if (message.color && message.text) {
            notifications.push(
                <FormNotification key={key} notificationMessage={message.text} colorClass={message.color}>
                </FormNotification>
            )
        }

        key++
    })







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