import './RegisterInput.css'

function RegisterInput({labelText, name, type, placeholder, onChange, isError = false }){


    let errorIcon = ""
    let className = ""
    if (isError){
        errorIcon = "*"
        className = "error-input"
    }

    return (
        <label>{labelText}
        <input className={className} type={type} name={name} placeholder={placeholder} onChange={onChange} />
        <span className='color-red'>{errorIcon}</span>
        </label>
    )

}

export default RegisterInput