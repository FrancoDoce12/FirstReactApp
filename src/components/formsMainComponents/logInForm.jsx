import Form from "./from";
import { generalLogIn } from "../../utils/general";


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
            onSubmit={
                async (userForm, context, event) => {
                    return await generalLogIn(userForm.email,userForm.password, context)
                }
            } />
    )
}


export default LogInForm