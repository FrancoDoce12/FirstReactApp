import { createContext, useState } from 'react'

let AppContext = createContext({})


function AppContextProvider({ children }) {

    const [cart, setCart] = useState([])

    const [isUserSessionOpen, setIsUserSessionOpen ] = useState(false)

    const [user, setUser] = useState({})


    let value ={
        cart,
        setCart,
        isUserSessionOpen,
        setIsUserSessionOpen,
        user,
        setUser,
        
    }


    return (<AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>)
}

export {AppContextProvider, AppContext}