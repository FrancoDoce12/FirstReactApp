import { Link } from "react-router-dom"
import { useState } from "react"


const DeployableText = ({ children }) => {

    const [deployItem, setDeployItem] = useState(false)

    let headerText
    if (deployItem) {
        headerText = "show less"
    } else {
        headerText = "more deatils.."
        children = ""
    }

    return (
        <>
            <Link onClick={() => { setDeployItem(!deployItem) }}><h6>{headerText}</h6></Link>
            <p>{children}</p>
        </>
    )
}

export default DeployableText