import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/itemDetailContainer';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import { AppContextProvider, AppContext } from './context/context';
import { useEffect, useState, useContext } from 'react';
import { checkUserSession } from './utils/functions';
import { test } from './utils/functions';


function App() {

  let context = useContext(AppContext)
  
  useEffect(() => {
    checkUserSession(context)
    
  },[]);

  return (
    <BrowserRouter>
      
      {/* <AppContextProvider> */}
        <div className="App">
          <Navbar />

          <Routes>
            <Route path='/' element={<ItemListContainer greetings={"Hola Mundoo"} />} ></Route>
            <Route path='/category/:category' element={<ItemListContainer />} ></Route>
            <Route path='/item/:id' element={<ItemDetailContainer />} ></Route>
            <Route path='/Register' element={<RegistrationForm/>} ></Route>
            {/* <ItemListContainer greetings={"Hola Mundoo"} /> */}

          </Routes>
        </div>
      {/* </AppContextProvider> */}

    </BrowserRouter>
  );
}

export default App;
