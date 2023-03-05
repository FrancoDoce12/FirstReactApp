import DeployableText from "./deployableText";
import Link1 from "../buttons/Link1";

const Option = ({link, linkText, description}) => {
    return (
    <>
        <Link1 to={link}>{linkText}</Link1>
        <DeployableText>
            {description}
        </DeployableText>
    </>
    )
}

export default Option