import Form from "./From";
import { registerUser } from "../../utils/functions";

function RegisterForm() {
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
            } onSubmit={async (user, context, event) => {
                return await registerUser(user,context)
            }} />
    )
}

export default RegisterForm