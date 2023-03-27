
const UserMiniDetailContainter = ({ title, user }) => {

    
    if (user?.email) {
        
        let elementH5 = user.name ? (<h5>{user.name}</h5>) : (<h5>{user.email}</h5>)
        return (
        <>
            <p>{title}</p>
            {elementH5}
        </>
        )
    } 
    return <></>

}

export default UserMiniDetailContainter 