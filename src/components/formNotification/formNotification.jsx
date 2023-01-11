import './formNotification.css'

function FormNotification({notificationMessage, colorClass = "red",icon = ""}){

    

    return (
        <div className='form-notification-container'>
            <button className={`middel-div color-class-${colorClass}`}>
            <h3 className={`form-notification`}>{`${notificationMessage}`}</h3>
            </button>
            <span>{icon}</span>
        </div>
    )
}


export default FormNotification