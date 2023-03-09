import Form from "./from";
import { getUserType } from "../../utils/main";
import { logInUser } from "../../utils/users";


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
                    const userType = await getUserType(userForm.email)
                    if (userType == 'documentUser') {
                        return await logInUser(userForm, context)
                    }
                    if (userType == "firebaseUser") {
                        return await "a"
                    }
                }
            } />
    )
}


export default LogInForm