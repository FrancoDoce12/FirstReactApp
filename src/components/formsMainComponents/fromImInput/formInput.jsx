import './formInput.css'
import React from 'react'

function FormInput({name, labelText = "",  type = "", placeholder = "", onChange = () => { }, isError = false, element = null, value = ""}) {


    let errorIcon = ""
    let className = ""
    if (isError) {
        errorIcon = "*"
        className = "error-input"
    }

    let inputElement
    if (element) {
        inputElement = React.cloneElement(element, { onChange, name })
    } else if (value) {
        inputElement = <input className={className} type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} />
    }
    else {
        inputElement = <input className={className} type={type} name={name} placeholder={placeholder} onChange={onChange} />
    }


    return (
        <div>
            <label>{labelText}
                {inputElement}
                <span className='color-red'>{errorIcon}</span>
            </label>
        </div>
    )

}

export default FormInput