import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import FormNotificationContainer from "../formNotificationContainer/formNotificationContainer";
import RegisterInput from "../registerImput/RegisterInput";
import SubmitButton from "../submitButton/submitButton";



function Form({ inputs, onSubmit = () => { } }) {



    const imputsToLoad = []
    const imputsValues = {}

    // imputsToLoad culd be a useState and de next part dawn the code culd be in a useEffect without dependendy
    // just for more performance

let inputId = 0
    inputs.forEach(input => {
        imputsToLoad.push(
            <RegisterInput
                labelText={input.labelText} key={inputId} type={input.type} name={input.name} placeholder={input.placeholder}
                onChange={event => {
                    // tengo que hacer que esta funcion guarde aca adentro los valores de cada una de los inputs
                    imputsValues[input.name] = event.target.value
                }}
            >
            </RegisterInput>
        )
        inputId++
    });





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
            let submitResult = await onSubmit(imputsValues, localContext, event)
            if (submitResult) {
                setFormState("succsesful")
            } else {
                setFormState("error")
            }
            
        }}>
            {imputsToLoad}
            <SubmitButton isShow={formState != "succsesful"} />
            <FormNotificationContainer notificationMessages={notificationMessages} />
        </form>
    )
}



export default Form