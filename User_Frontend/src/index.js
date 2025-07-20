import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './Components/ProductDetail';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AllProduct from './Components/AllProduct';
import CartList from './Components/CartList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <BrowserRouter>
    //     <Routes>
    //         <Route path='/' element={<App />}>
    //             <Route index element={<AllProduct />} />
    //             <Route path='/productbyid/:id' element={<ProductDetail />} />
    //             <Route path='/login' element={<Login />} />
    //             <Route path='/signup' element={<SignUp />} />
    //             <Route path='/cartlist/:id' element={<CartList />} />
    //         </Route>
    //     </Routes>
    // </BrowserRouter>
    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

