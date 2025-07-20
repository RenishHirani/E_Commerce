import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/signup");
    }
  }, []); 

  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:3035/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/");
    }
    window.location.reload();
  };

  return (
    <>
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Add Member</h1>

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
      className="inputBox"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
      className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="signupbutton"
        type="submit"
        onClick={collectData}
      >
        Register
      </button>
      </div>
    </>
  );
}
