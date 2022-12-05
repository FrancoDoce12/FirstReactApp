import 'itemComponent.css'



function itemComponent(img_source, alt, title, description) {

    return (
        <div className='item_container'>
            <img src={img_source} alt={alt} />
            <div className='text_container'>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )

}

export default itemComponent