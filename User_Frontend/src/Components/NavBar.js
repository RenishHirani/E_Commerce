import { Link, useNavigate } from "react-router-dom";
import "./Component.css";
import ProductCards from "./CartList";
import React, { Component, useEffect, useRef, useState } from "react";
export default function NavBar() {
  const auth = localStorage.getItem("publics");
  var parsed;
  if (auth) {
    parsed = JSON.parse(auth);
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("publics"); 
    window.location.reload();
  };

  const [count, setCount] = useState({ result: 0 });

  useEffect(() => {
    if (parsed) {
      getCartCount();
    }
  }, [count]);

  const getCartCount = async () => {
    fetch("http://localhost:3035/countincart/" + parsed._id)
      .then((res) => res.json())
      .then((res) => setCount(res));
  };
  return (
    <>
      <nav className="flex-no-wrap flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-te-collapse-item
          >
            <a
              className="mb-3 mr-10 ml-1 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              href="/"
            >
              <img
                src="https://tse2.explicit.bing.net/th?id=OIP.1Np5E3gidTnjWPXnjMHSwwAAAA&pid=Api&P=0&h=220"
                style={{ height: "40px", width: "50px" }}
                alt="TE Logo"
                loading="lazy"
              />
            </a>

            <div>
              <Link
                to="/"
                className=""
                style={{ fontWeight: "bold", color: "white" }}
              >
                Home
              </Link>
              {auth ? (
                <Link className="ms-3" to="/myorder" style={{color: "white", fontWeight: "bold"}}>
                  My Orders
                </Link>
              ) : (
                ""
              )}
              <cartCount />
            </div>
          </div>

          {auth ? (
            <>
              <div className="relative flex items-center">
                <Link
                  to={`cartlist/${parsed._id}`}
                  className="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  href="#"
                >
                  <span className="[&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>

                    <span className="absolute -mt-7 ml-3 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                      {count.result}
                    </span>
                  </span>
                </Link>
                <div className="relative">
                  <button onClick={logout} className="btn btn-warning">
                    Log Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div class="button-div">
              <button class="signup-button" onClick={() => navigate("/signup")}>
                Signup
              </button>
              <button class="login-button" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
