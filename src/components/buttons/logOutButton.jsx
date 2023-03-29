import { closeGeneralUserSession } from "../../utils/general"
import Link1 from "./Link1"


const LogOutButton = ({context}) => {

    return (<Link1 onClick={() => {
        closeGeneralUserSession(context)
    }} to={"/"} >Log out</Link1>)
}

export default LogOutButton