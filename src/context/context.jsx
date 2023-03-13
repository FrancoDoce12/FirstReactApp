import { createContext, useState } from 'react'

let AppContext = createContext({})


function AppContextProvider({ children }) {

    const [cart, setCart] = useState([])

    const [isUserSessionCheck, setIsUserSessionCheck] = useState(false)

    const [user, setUser] = useState({})

    const [isInRegister, setIsInRegister] = useState(false)

    const [userType, setUserType] = useState({ validation: false, type: undefined })


    console.log(userType, "userType")


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


    return (<AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>)
}

export { AppContextProvider, AppContext }