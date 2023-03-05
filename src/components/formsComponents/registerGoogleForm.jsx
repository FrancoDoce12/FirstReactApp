import { userGoogleRegister } from "../../utils/functions";
import Form from "./From";

function RegisterGoogleForm() {
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
                return await userGoogleRegister(user)
            }} />
    )
}

export default RegisterGoogleForm