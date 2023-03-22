
const CancelButton = ({onClick, children}) => {
    return (
        <>
        <button type="button" className="cancelButton" onClick={onClick} >{children}</button>
        </>
    )
}

export default CancelButton