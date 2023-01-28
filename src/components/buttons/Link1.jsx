import { Link } from 'react-router-dom'
import Button1 from './Button1'

function Link1({ children, to, onClick, hide }) {
    return (
        <Link to={to}>
            <Button1 onClick={onClick} hide={hide}>
                {children}
            </Button1>
        </Link>
    )
}

export default Link1