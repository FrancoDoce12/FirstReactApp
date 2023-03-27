import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/itemDetailContainer';
import { AppContextProvider, AppContext } from './context/context';
import { useEffect, useState, useContext } from 'react';
import RegisterUserForm from './components/formsMainComponents/registerUserForm';
import LogInForm from './components/formsMainComponents/logInForm';
import RegisterOptions from './components/registerOptions/registerOptions';
import RegisterFirestoreUserForm from './components/formsMainComponents/registerFirestoreUserForm';
import { firebaseTest, saveFirebaseUserDataInContext } from './utils/firebaseUsers';
import { auth } from './firebase/config';
import { checkGeneralUserSession } from './utils/general';
import CreateProductForm from './components/formsMainComponents/createProductForm';
import { test } from './utils/products';




function App() {

  let context = useContext(AppContext)

  useEffect(() => {
    checkGeneralUserSession(context)
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
          <Route path='/RegisterOption1' element={<RegisterUserForm />} ></Route>
          <Route path='/RegisterOption2' element={<RegisterFirestoreUserForm />} ></Route>
          <Route path='/RegisterOptions' element={<RegisterOptions />} ></Route>
          <Route path='/CreateNewProduct' element={<CreateProductForm />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
