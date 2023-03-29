import { createContext, useEffect, useState } from 'react'
import { test } from '../utils/products'

let AppContext = createContext({})


function AppContextProvider({ children }) {


    const [isUserSessionCheck, setIsUserSessionCheck] = useState(false)

    const [user, setUser] = useState({})

    const [isInRegister, setIsInRegister] = useState(false)

    const [userType, setUserType] = useState({ validation: false, type: undefined })

    const [cartCount, setCartCount] = useState(0)

    useEffect(()=>{
        if (user.cart?.length){
            setCartCount(user.cart.length)
        }
    },[user])
    

    let value = {
        cartCount,
        setCartCount,
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