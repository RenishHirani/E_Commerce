import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{ 
        const auth = localStorage.getItem('user')
        if(auth)
        {
            navigate('/')
        }
    },[])

    const handleLogin=async ()=>{
        let result = await fetch('http://localhost:3035/login',{
            method : 'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json()
        console.warn(result)
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result))
            navigate("/")
        }
        else{
            alert('please enter correct detail')
        }
    }

    return(
        <>
            <div style={{background: 'radial-gradient(#fff, #ffd6d6)',padding: '50px 0px'}}>
            <div style={{maxWidth: '1300px',margin: 'auto',paddingLeft: '25px',paddingRight: '25px'}}>
                <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',justifyContent: 'space-around'}}>
                    <div style={{flexBasis: '50%',minWidth: '300px'}}>
                        <img src="images/image1.png" width="100%" style={{maxWidth: '100%',padding: '50px 0'}}/>
                    </div>
                    <div style={{flexBasis: '50%',minWidth: '300px'}}>
                        <div style={{background: '#fff',width: '300px',height: '400px',position: 'relative',textAlign: 'center',padding: '20px 0',margin: 'auto',boxShadow: '0 0 20px 0px rgba(0, 0, 0, 0.1)',overflow: 'hidden'}}>
                            <form style={{left: '0',maxWidth: '300px',padding: '0 20px',position: 'absolute',top: '80px',transition: 'transform 1s'}}>
                            <h2 style={{marginBottom: '50px'}}>Login</h2>
                            <input style={{width: '100%',height: '30px',margin: '10px 0',padding: '0 10px',border: '1px solid #ccc'}} type="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <input style={{width: '100%',height: '30px',margin: '10px 0',padding: '0 10px',border: '1px solid #ccc'}} type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            <button style={{width: '100%',border: 'none',cursor: 'pointer',margin: '10px 0px',border: 'none',background: '#ff523b',borderRadius: '30px',color: 'white',padding: '8px 30px'}} type="submit" class="btn" onClick={handleLogin}>Login</button>
                            <a href="">Forget Password</a>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}