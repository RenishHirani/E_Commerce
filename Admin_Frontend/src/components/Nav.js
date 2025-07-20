import { Link, useNavigate } from "react-router-dom";
import React from "react";
// import App from "../App";

export default function Nav() {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login')
        // console.log('apple')
    }
    return (
        <div>
            <img alt="not found" className="logo" src="\images\logo.png" style={{margin: '12px',marginLeft: '50px'}}/>
            {auth ? <ul className="nav-ul">
                <li><Link to='/' >Products</Link></li>
                <li><Link to='/add' >Add Product</Link></li>
                <li><Link to='/add-category'>Add Category</Link></li>
                <li><Link to='/signup'>Add Member</Link></li>
                <li> <Link onClick={logout} to='/login' >Log Out ({JSON.parse(auth).name}) </Link> </li>
            </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to='/login' >Login</Link></li>
                </ul>
            }
        </div>
    )
}