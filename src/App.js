import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/itemDetailContainer';
import { AppContext } from './context/context';
import { useEffect, useContext, useState } from 'react';
import RegisterUserForm from './components/formsMainComponents/registerUserForm';
import LogInForm from './components/formsMainComponents/logInForm';
import RegisterOptions from './components/registerOptions/registerOptions';
import RegisterFirestoreUserForm from './components/formsMainComponents/registerFirestoreUserForm';
import { checkGeneralUserSession } from './utils/general';
import CreateProductForm from './components/formsMainComponents/createProductForm';
import CartView from './components/cartView/cartView';



function App() {

  let context = useContext(AppContext)

  useEffect(() => {
    checkGeneralUserSession(context)
  }, []);


  return (
    <Router >

      <div className="App">
        <Navbar />

        <Routes >
          <Route path='/' element={<ItemListContainer />} ></Route>
          <Route path='/category/:category' element={<ItemListContainer />} ></Route>
          <Route path='/item/:id' element={<ItemDetailContainer />} ></Route>
          <Route path='/LogIn' element={<LogInForm />} ></Route>
          <Route path='/RegisterOption1' element={<RegisterUserForm />} ></Route>
          <Route path='/RegisterOption2' element={<RegisterFirestoreUserForm />} ></Route>
          <Route path='/RegisterOptions' element={<RegisterOptions />} ></Route>
          <Route path='/CreateNewProduct' element={<CreateProductForm />} ></Route>
          <Route path='/cartView' element={<CartView />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
