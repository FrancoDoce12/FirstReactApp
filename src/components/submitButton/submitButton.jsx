import './submitButton.css'

function SubmitButton({ isShow = true }) {

    if (isShow) {
        return (
            <label>
                <button type="submit">Register profile</button>
            </label>
        )
    }
    return (
        <>
        </>
    )

}


export default SubmitButton
