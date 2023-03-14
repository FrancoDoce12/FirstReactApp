import Form from "./from";
import { registerAndLogInUser } from "../../utils/users"; 

function RegisterUserForm() {
    return (
        <Form
            inputs={
                [
                    {
                        labelText: "Email: ",
                        type: "email",
                        name: "email",
                        placeholder: "example@gmail.com"
                    },
                    {
                        labelText: "Acount Name: ",
                        type: "text",
                        name: "name",
                        placeholder: "my name 123"
                    },
                    {
                        labelText: "Password: ",
                        type: "password",
                        name: "password1",
                        placeholder: ""
                    },
                    {
                        labelText: "Repeat your password: ",
                        type: "password",
                        name: "password2",
                        placeholder: ""
                    },
                ]
            } onSubmit={async (formUser, context, event) => {
                return await registerAndLogInUser(formUser, context)
            }} />
    )
}

export default RegisterUserForm