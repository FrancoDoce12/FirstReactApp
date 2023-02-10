import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/itemDetailContainer';
import { AppContextProvider, AppContext } from './context/context';
import { useEffect, useState, useContext } from 'react';
import { checkUserSession } from './utils/functions';
import { test } from './utils/functions';
import Form from './components/formsComponents/From';
import { type } from '@testing-library/user-event/dist/type';
import RegisterForm from './components/formsComponents/registerForm';
import LogInForm from './components/formsComponents/logInForm';



function App() {

  let context = useContext(AppContext)

  useEffect(() => {
    checkUserSession(context)
    test()
    
  }, []);

  //

  return (
    <BrowserRouter>

      {/* <AppContextProvider> */}
      <div className="App">
        <Navbar />

        <Routes>
          <Route path='/' element={<ItemListContainer greetings={"Hola Mundoo"} />} ></Route>
          <Route path='/category/:category' element={<ItemListContainer />} ></Route>
          <Route path='/item/:id' element={<ItemDetailContainer />} ></Route>
          <Route path='/LogIn' element={<LogInForm />} ></Route>
          <Route path='/Register' element={<RegisterForm />} ></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
