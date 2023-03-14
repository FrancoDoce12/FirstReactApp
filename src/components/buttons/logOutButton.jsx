import { closeGeneralUserSession } from "../../utils/general"
import Button1 from "./Button1"


const LogOutButton = ({context}) => {
    return (<Button1 onClick={() => {
        closeGeneralUserSession(context)
    }} >Log out</Button1>)
}

export default LogOutButton