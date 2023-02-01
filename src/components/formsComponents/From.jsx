import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { registerUser } from "../../utils/functions";
import FormNotificationContainer from "../formNotificationContainer/formNotificationContainer";
import RegisterInput from "../registerImput/RegisterInput";
import SubmitButton from "../submitButton/submitButton";



function Form({ inputs, onSubmit = () => { } }) {



    const imputsToLoad = []
    const imputsValues = {}

    // despues fijarse que hacer o convertir en un estado para mejorar el rendimiento del elemento


    inputs.forEach(input => {
        // aca tengo que crear los use states y ponerlos dentro de "imputsValues" para que sean usados por la funcion de abajo y guardar los 2 dentro de un objeto u otro array
        imputsToLoad.push(
            <RegisterInput
                labelText={input.labelText} type={input.type} name={input.name} placeholder={input.placeholder}
                onChange={event => {
                    // tengo que hacer que esta funcion guarde aca adentro los valores de cada una de los inputs
                    imputsValues[input.name] = event.target.value
                }}
            >
            </RegisterInput>
        )
    });





    let localContext = useContext(AppContext)
    const [formState, setFormState] = useState("default")
    const notificationMessages = []

    switch (formState) {
        case "loading":
            notificationMessages.push({ text: "Loading registration", color: "gray" })
            break
        case "succsesful":
            notificationMessages.push({ text: "Account loged succsesfully", color: "green" })
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
            console.log(formState, 1)
            let caca = await onSubmit(imputsValues, localContext, event)
            console.log(caca, "el resultado es")
            if (caca) {
                setFormState("succsesful")
                console.log(formState, 2)
            } else {
                setFormState("error")
                console.log(formState, 3)
            }
            
        }}>
            {imputsToLoad}
            <SubmitButton isShow={formState != "succsesful"} />
            <FormNotificationContainer notificationMessages={notificationMessages} />
        </form>
    )
}



export default Form