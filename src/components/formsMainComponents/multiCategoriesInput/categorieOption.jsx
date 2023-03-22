import CancelButton from "../../buttons/cancelButton/cancelButton"
import FormInput from "../fromImInput/formInput"


const CategorieOption = ({  labelText, cancelLabelText, onChange, onCancel }) => {



    return (
        <>
            <FormInput name={""}  labelText={labelText} onChange={onChange} />
            <CancelButton onClick={onCancel} >{cancelLabelText}</CancelButton>
        </>
    )
}

export default CategorieOption 