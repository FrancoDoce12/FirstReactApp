import { logInUser } from "../../utils/functions";
import Form from "./From";


function LogInForm() {
    return (
        <Form inputs={[
            {
                labelText: "Email: ",
                type: "email",
                name: "email",
                placeholder: "example@gmail.com"
            },
            {
                labelText: "Your Password: ",
                type: "password",
                name: "password",
                placeholder: ""
            }
        ]}
        onSubmit = { 
            async (userForm, context, event) => {
                return await logInUser(userForm, context)
            }
        } />


    )
}


export default LogInForm