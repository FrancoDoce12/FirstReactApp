import './RegistrationForm.css'
import FormNotificationContainer from '../formNotificationContainer/formNotificationContainer'
import RegisterInput from '../registerImput/RegisterInput'
import SubmitButton from '../submitButton/submitButton'
import { useState, useContext, useEffect } from 'react'
import { registerUser, checkPasswords, test, getUserByEmail } from '../../utils/functions'
import { AppContext } from '../../context/context'
import { doc, getFirestore } from 'firebase/firestore'


function RegistrationForm() {




    const [nameInput, setNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPassword] = useState("")
    const [password2Input, setPassword2] = useState("")
    let localContext = useContext(AppContext)


    const [formState, setFormState] = useState("default")
    // Posibles states of form are: loading, succsesful, error and default

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
        <form onSubmit={event => {
            event.preventDefault();


            setFormState("loading")

            // (async function () {

            // })();

            async function register() {
                // function code here
                if (await registerUser({ name: nameInput, email: emailInput, password1: passwordInput, password2: password2Input }, true, localContext) === true) {
                    setFormState("succsesful")
                } else {
                    setFormState("error")
                    // need some notification to tell that the password have to be the same
                }
            }
            register()




        }}>
            <div>

                <RegisterInput labelText={"Acount Name:"} type={"text"} name={"Name"}
                    placeholder={"Name"} onChange={(event => setNameInput(event.target.value))}
                ></RegisterInput>

            </div>
            <div>

                <RegisterInput labelText={"Email:"} type={"email"} name={"email"}
                    placeholder={"example@email.com"} onChange={(event => setEmailInput(event.target.value))}
                ></RegisterInput>

            </div>
            <div>

                <RegisterInput
                    labelText={"Password:"} type={"password"} name={"password"}
                    placeholder={"YourPassWord456"}
                    onChange={(event => setPassword(event.target.value))}
                ></RegisterInput>

            </div>
            <div>

                <RegisterInput
                    labelText={"Repeat your password:"} type={"password"} name={"password"}
                    placeholder={"YourPassWord456"}
                    onChange={(event => setPassword2(event.target.value))}
                ></RegisterInput>

            </div>
            <SubmitButton isShow={formState != "succsesful"} ></SubmitButton>
            <FormNotificationContainer notificationMessages={notificationMessages}>
                <h2>child</h2>
            </FormNotificationContainer>
        </form>
    )
}

export default RegistrationForm