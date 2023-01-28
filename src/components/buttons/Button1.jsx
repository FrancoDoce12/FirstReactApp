import './buttons.css'

function Button1({children, onClick, hide}){
    

    if(hide){
        return (<></>)
    }
    if (onClick){
        return (
            <button className='Button1' onClick={onClick}>{children}</button>
        )
    }
    
    return (
        <button className='Button1'>{children}</button>
    )
}

export default Button1