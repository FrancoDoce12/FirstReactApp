import RegisterInput from "../registerImput/RegisterInput";



function Form({ action, inputs }) {


    //input.labelText,input.type,input.name,input.placeholder
    const imputsToLoad = []
    const imputsValues = []

    inputs.forEach(input => {
        // aca tengo que crear los use states y ponerlos dentro de "imputsValues" para que sean usados por la funcion de abajo y guardar los 2 dentro de un objeto u otro array
        imputsToLoad.push(
            <RegisterInput
                labelText={input.labelText} type={input.type} name={input.name} placeholder={input.placeholder}
                onChange={() => {
                    // tengo que hacer que esta funcion guarde aca adentro los valores de cada una de los inputs
                    imputsValues[a]
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
        <form action={action}>

        </form>
    )
}



export default Form