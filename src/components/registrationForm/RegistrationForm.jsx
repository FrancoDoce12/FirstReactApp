import './RegistrationForm.css'
import FormNotificationContainer from '../formNotificationContainer/formNotificationContainer'
import RegisterInput from '../registerImput/RegisterInput'
import { useState, useContext, useEffect } from 'react'
import { registerUser , checkPasswords, test, getUserByEmail } from '../../utils/functions'
import { AppContext } from '../../context/context'
import { doc, getFirestore } from 'firebase/firestore'

function RegistrationForm() {



    useEffect( () => {

    }, [])



    const [nameInput, setNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPassword] = useState("")
    const [password2Input, setPassword2] = useState("")



    return (
        <form onSubmit={event => {
            event.preventDefault();
            console.log("onSubmit event")
            const caca = registerUser({ name: nameInput, email: emailInput, password1: passwordInput, password2: password2Input }, true)
            console.log(caca, "comprobacion aaaaaaaa")
            if (registerUser({ name: nameInput, email: emailInput, password1: passwordInput, password2: password2Input }, true) === true ) {
                console.log('usuario registrado con exito')
            } else {
                console.log("usuario no fue registrado")
                // need some notification to tell that the password have to be the same
            }

        }}>
            <div>
            <RegisterInput labelText={"Acount Name:"} inputType={"text"}inputName={"Name"}
            inputPlaceholder={"Name"} onChangeEventCallBack={(event => setNameInput(event.target.value))}
            ></RegisterInput>
                <label>Acount Name:
                    <input type="text" name="name" placeholder='Name' onChange={event => setNameInput(event.target.value)} />
                </label>
            </div>
            <div>
                <label>Email:
                    <input type="email" name="email" placeholder='example@email.com' onChange={event => setEmailInput(event.target.value)} />
                </label>
            </div>
            <div>
                <label>Password:
                    <input type="password" name="password" placeholder='YourPassWord456' onChange={event => setPassword(event.target.value)} />
                </label>
            </div>
            <div>
                <label>Repeat your password:
                    <input type="password" name="password" placeholder='YourPassWord456' onChange={event => setPassword2(event.target.value)} />
                </label>
            </div>
            <button type="submit">Register profile</button>
            <FormNotificationContainer notificationMessages= {["hola","nos vemos","que gay que sos"]}>
                <h2>child</h2>
            </FormNotificationContainer>
        </form>
    )
}

export default RegistrationForm