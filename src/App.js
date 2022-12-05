import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/navbar/Navbar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';

function App() {
  return (
    <BrowserRouter>


      <div className="App">
        <Navbar />

        <Routes>
          <Route path='/' element={<ItemListContainer greetings={"Hola Mundoo"}/>} ></Route>
        {/* <ItemListContainer greetings={"Hola Mundoo"} /> */}
        
        </Routes>
      </div>


    </BrowserRouter>
  );
}

export default App;
