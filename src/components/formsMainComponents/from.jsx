import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { isIterable } from "../../utils/main";
import FormNotificationContainer from "../formNotificationContainer/formNotificationContainer";
import FormInput from "./fromImInput/formInput";
import SubmitButton from "../submitButton/submitButton";



function Form({ children, inputs, onSubmit = () => { } }) {

    const imputsToLoad = []
    const [inputsValues, setImputsValues] = useState({})
    const [valuesRef] = useState({inputsValues ,setImputsValues})

    useEffect(()=>{
        valuesRef.inputsValues = inputsValues
    },[inputsValues])

    // mananging the inputs and their event onChange
    let inputId = 0
    inputs.forEach(input => {
        const id = inputId
        let onChange
        if (input.type == "checkbox") {
            onChange = (event) => {
                let newInputValues = { ...valuesRef.inputsValues }
                let dataObj = newInputValues[input.name]
                if (event.target.checked) {
                    if (dataObj) {
                        //adds the value to the obj
                        dataObj[id] = input.value
                    } else {
                        // creates the obj and adds the value
                        dataObj = {}
                        dataObj[id] = input.value
                    }
                } else {
                    // delete the element unChecked of the obj
                    delete dataObj[id]
                }
                newInputValues[input.name] = dataObj
                setImputsValues(newInputValues)
            }
        } else {
            onChange = (event) => {
                let newInputValues = { ...valuesRef.inputsValues }
                newInputValues[input.name] = event.target.value
                setImputsValues(newInputValues)
            }
        }

        imputsToLoad.push(
            <FormInput
                labelText={input.labelText} key={inputId} value={input.value} type={input.type} name={input.name} placeholder={input.placeholder} element={input.element}
                onChange={onChange}
            />
        )
        inputId++
    });


    // adding the ref to the childrens so they can load values to the form
    let childrenWithRef
    if (isIterable(children)) {
        childrenWithRef = []
        children.forEach(children, (child) => {
            childrenWithRef.push(child(inputsValues, setImputsValues))
        })
    }
    else {
        childrenWithRef = children(inputsValues, setImputsValues)
    }




    let localContext = useContext(AppContext)
    const [formState, setFormState] = useState("default")
    const notificationMessages = []

    switch (formState) {
        case "loading":
            notificationMessages.push({ text: "Loading Request", color: "gray" })
            break
        case "succsesful":
            notificationMessages.push({ text: "Action Succsesful", color: "green" })
            break
        case "error":
            notificationMessages.push({ text: "Error", color: "red" })
            break
        default:
            break
    }



    return (
        <form onSubmit={async (event) => {

            event.preventDefault()
            setFormState("loading")
            let submitResult = await onSubmit(inputsValues, localContext, event)
            if (submitResult) {
                setFormState("succsesful")
            } else {
                setFormState("error")
            }

        }}>
            {imputsToLoad}
            {childrenWithRef}
            <SubmitButton isShow={formState != "succsesful"} />
            <FormNotificationContainer notificationMessages={notificationMessages} />
        </form>
    )
}



export default Form