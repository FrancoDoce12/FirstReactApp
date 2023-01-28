import './formNotification.css'

function FormNotification({notificationMessage, colorClass = "red",icon = ""}){



    return (
        <div className='form-notification-container'>
            <div className={`middel-div color-class-${colorClass}`}>
            <h3 className={`form-notification`}>{`${notificationMessage}`}</h3>
            </div>
            <span>{icon}</span>
        </div>
    )
}


export default FormNotification