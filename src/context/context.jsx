import { createContext, useState } from 'react'

let AppContext = createContext({})


function AppContextProvider({ children }) {

    const [cart, setCart] = useState([])

    const [isUserSessionCheck, setIsUserSessionCheck ] = useState(false)

    const [user, setUser] = useState({})

    const [isInRegister, setIsInRegister] = useState(false)


    let value ={
        cart,
        setCart,
        user: user,
        setUser : setUser,
        isUserSessionCheck,
        setIsUserSessionCheck,
        isInRegister,
        setIsInRegister
        
        
    }


    return (<AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>)
}

export {AppContextProvider, AppContext}