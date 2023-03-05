import Option from "./option";

const Options = ({ title, optionsList }) => {

    const options = []
    optionsList.forEach(option => {
        var optionElement = (
            <Option link={option.link} linkText={option.linkText} description={option.description} />
        )
        options.push(optionElement)
    });

    return (
        <>
            <h2>{title}</h2>
            {options}
        </>
    )
}

export default Options