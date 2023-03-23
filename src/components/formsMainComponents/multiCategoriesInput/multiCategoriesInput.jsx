import { useEffect, useState } from "react"
import { isIterable } from "../../../utils/main"
import Button1 from "../../buttons/Button1"
import FormInput from "../fromImInput/formInput"
import CancelButton from "../../buttons/cancelButton/cancelButton"
import CategorieOption from "./categorieOption"


const MultiCategoriesInput = ({ name,  formData,  setFormData }) => {

    const [inputsCount, setInputsCount] = useState(0)
    const [categories, setCategories] = useState({})
    const [refObj] = useState({ categories, setCategories,  formData,  setFormData })

    useEffect(() => {
        // makes a unpdate of the reference of categories, when it changes
        // becouse if not, this will acces to the old categories and makes no changes
        refObj.categories = categories
        refObj.formData = formData
    }, [categories, formData])


    const getInputCount = () => {
        setInputsCount(inputsCount + 1)
        return inputsCount
    }

    function addCategorie() {
        const elementKey = `A${getInputCount()}`
        let element = (
            <CategorieOption
                key={elementKey} cancelLabelText={"cancel Categorie"}
                labelText={"new Categorie"}

                onChange={event => {
                    // dont need re render when this executes
                    // thats why it does not created a new ref using the {...formData[name]}
                    const formData = refObj.formData
                    let dataObj = formData[name]
                    if (dataObj) {
                        dataObj[elementKey] = event.target.value
                    } else {
                        dataObj = {}
                        dataObj[elementKey] = event.target.value
                    }
                    formData[name] = dataObj
                    setFormData(formData)
                }}

                onCancel={() => {
                    const newCategories = { ...refObj.categories }
                    delete newCategories[elementKey]
                    setCategories(newCategories)

                    const formData = refObj.formData
                    if (formData?.[name]?.[elementKey]) {
                        delete formData[name][elementKey]
                    }
                    setFormData(formData)
                }}
            />
        )
        // there is no need to acsess to the categories by ref becouse this ref is,
        // in this scope the directly last updated one
        const newCategories = categories
        newCategories[elementKey] = element
        setCategories(newCategories)
    }


    return (
        <>
            <div>
                {Object.values(categories)}
            </div>
            <div>
                <Button1 onClick={() => { addCategorie() }}>Add new Categorie</Button1>
            </div>
        </>
    )
}

export default MultiCategoriesInput