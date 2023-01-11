import './RegisterInput.css'

function RegisterInput({labelText, inputName, inputType, inputPlaceholder, onChangeEventCallBack, isError = false }){


    let errorIcon = ""
    let inputClassName = ""
    if (isError){
        errorIcon = "*"
        inputClassName = "error-input"
    }

    return (
        <label>{labelText}
        <input className={inputClassName} type={inputType} name={inputName} placeholder={inputPlaceholder} onChange={onChangeEventCallBack} />
        <span className='color-red'>{errorIcon}</span>
        </label>
    )

}

export default RegisterInput