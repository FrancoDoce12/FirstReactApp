import { createContext, useState } from 'react'
import { test } from '../utils/products'

let AppContext = createContext({})


function AppContextProvider({ children }) {

    const [cart, setCart] = useState([])

    const [isUserSessionCheck, setIsUserSessionCheck] = useState(false)

    const [user, setUser] = useState({})

    const [isInRegister, setIsInRegister] = useState(false)

    const [userType, setUserType] = useState({ validation: false, type: undefined })



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

    // test(value)

    return (<AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>)
}

export { AppContextProvider, AppContext }