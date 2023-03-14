import Option from "./option";

const Options = ({ title, optionsList }) => {

    const options = []
    let elementKey = 0
    optionsList.forEach(option => {
        var optionElement = (
            <Option key={elementKey} link={option.link} linkText={option.linkText} description={option.description} />
        )
        options.push(optionElement)
        elementKey++
    });

    return (
        <>
            <h2>{title}</h2>
            {options}
        </>
    )
}

export default Options