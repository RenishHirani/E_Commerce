import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import AllProduct from './Components/AllProduct';
import Drawer from './Components/Drawer';
import Login from './Components/Login';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import ProductDetail from './Components/ProductDetail';
import SignUp from './Components/SignUp';
import CartList from './Components/CartList';
import PlaceOrder from './Components/PlaceOrder';
import MyOrder from './MyOrder';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<AllProduct />}></Route>
          <Route path='/productbyid/:id' element={<ProductDetail/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/cartlist/:id' element={<CartList/>} />
          <Route path='/placeorder/:id' element={<PlaceOrder/>} />
          <Route path='/myorder' element={<MyOrder/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
