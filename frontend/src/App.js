import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import ProductList from './components/products/ProductList';
import ProductAdmin from './components/products/ProductAdmin';
import CreateProduct from './components/products/CreateProduct';
import Navbar from './components/navbar/Navbar';
import UpdateProduct from './components/products/UpdateProduct';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
     <Routes> 
      <Route path='/' element={<Home/>}/>
      <Route path='/products/list' element={<ProductList/>}/>
      <Route path='/products/admin' element={<ProductAdmin/>}/>
      <Route path='/products/create' element={<CreateProduct/>}/>
      <Route path='/products/:id' element={<UpdateProduct/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
