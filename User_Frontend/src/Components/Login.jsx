import React, { useEffect, useState } from "react";
import './Component.css';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

//   useEffect(()=>{ 
//     const auth = localStorage.getItem('publics')
//     if(auth)
//     {
//         navigate('/login')
//     }
// },[])

  const handleLogin = async () => {
    let result = await fetch('http://localhost:3035/login/user', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json()
    if (result.name) {
      localStorage.setItem("publics", JSON.stringify(result))
      navigate("/")
    }
    else {
      alert('please enter correct detail')
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">

            <form className="card-body cardbody-color p-lg-5">
              <button class="button" onClick={() => navigate('/')}>Back</button>
              <div className="">
                <img src="https://tse1.mm.bing.net/th?id=OIP.LG6UqvINZmEBMrUzrhADJAHaHa&pid=Api&P=0&h=220" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px" alt="profile" />
              </div>
              <div className="mb-3">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control inp" id="Username" aria-describedby="emailHelp"
                  placeholder="Email Address" />
              </div>
              <div className="mb-3">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control inp" id="password" placeholder="password" />
              </div>
              <div className="text-center"><button onClick={handleLogin} type="submit" className="btn btn-color px-5 mb-5 w-100">Login</button></div>
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                Registered? <Link to='/signup' className="text-dark fw-bold"> Create an
                  Account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
