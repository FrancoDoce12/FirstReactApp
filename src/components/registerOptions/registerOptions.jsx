import Options from "./options"

const RegisterOptions = () => {
    return (
        <Options title={"there are two registraition options"} optionsList={[{

            link: "/RegisterOption2",
            linkText: "Register using the email system provide by Firestore",
            description: "the normal system that when you register, you need to verify your email or it will not let you navigate through this page"
        }, {

            link: "/RegisterOption1",
            linkText: "Register uning the users system made by my",
            description: "this system is sligly diferent then a normal one because it uses somthig calle session numbers and are stores in the local storage and then compared with the one that is in the db, if it is not the same your session will close and you will have to enter again generating a new session mumber, all of this need some hashes to make it more secure"
        }]}>

        </Options>
    )
}

export default RegisterOptions