import { createContext, useState } from 'react'

let AppContext = createContext({})


function AppContextProvider({ children }) {

    const [cart, setCart] = useState([])

    const [isUserSessionCheck, setIsUserSessionCheck] = useState(false)

    const [user, setUser] = useState({})

    const [isInRegister, setIsInRegister] = useState(false)

    const [userType, setUserType] = useState({ validation: false, type: undefined })


    console.log(user, "este es el user")


    let value = {
        cart,
        setCart,
        user,
        setUser,
        isUserSessionCheck,
        setIsUserSessionCheck,
        isInRegister,
        setIsInRegister,
        userType,
        setUserType
    }

    console.log(value, "valores del contexto dentro del context")

    return (<AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>)
}

export { AppContextProvider, AppContext }