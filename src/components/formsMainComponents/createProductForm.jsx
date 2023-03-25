import { createProduct } from "../../utils/products";
import Form from "./from";
import MultiCategoriesInput from "./multiCategoriesInput/multiCategoriesInput";

const CreateProductForm = () => {



    const multiCategoriesInput = (formData, setFormData) => <MultiCategoriesInput name={"categories"} formData={formData} setFormData={setFormData} />

    const textArea = <textarea />
    const inputs = [
        {
            labelText: "Title of the Product",
            type: "text",
            name: "title",
            placeholder: ""
        },
        {
            name: "description",
            labelText: "detail description of the product",
            isCustom: true,
            element: textArea
        },
        {
            labelText: "Source of the Img/URL",
            type: "text",
            name: "img_source",
        },
        {
            labelText: "Brief Description of the img",
            type: "text",
            name: "alt",
        },
        {
            labelText: "red",
            type: "checkbox",
            name: "categories",
            value: "red"
        },
        {
            labelText: "blue",
            type: "checkbox",
            name: "categories",
            value: "blue"
        },
        {
            labelText: "purple",
            type: "checkbox",
            name: "categories",
            value: "purple"
        },
    ]

    return <Form inputs={inputs} onSubmit={
        async (product, context, event) => {
            console.log(product, "the produuct!!!!")
            return await createProduct(product,context)
        }
    } >
        {multiCategoriesInput}
    </Form>
}

export default CreateProductForm