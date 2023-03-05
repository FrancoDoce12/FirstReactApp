import { logInUser, logIngeneral } from "../../utils/functions";
import Form from "./From";
import { useContext } from "react";
import { AppContext } from "../../context/context";


function LogInForm() {

    // if (useContext(AppContext).user.name){
    //     return (
    //         <h2>Your user is alredy loged</h2>
    //     )
    // }

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
                return await logIngeneral(userForm, context)
            }
        } />
    )
}


export default LogInForm