import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
// import Footer from './components/Footer';
// import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import SignUp from './components/SignUp';
import AddCategory from './components/AddCategory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path='/' element={<ProductList/>}></Route>
          <Route path='/add' element={<AddProduct/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/update/:id' element={<UpdateProduct/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/add-category' element={<AddCategory/>}></Route>
          <Route path='/logout' element={<h1>logout</h1>}></Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
      <Routes>
        {/* <Route path='/signup' element={<SignUp />}></Route> */}
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
