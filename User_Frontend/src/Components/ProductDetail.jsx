import { useNavigate, useParams } from "react-router-dom";
import "./Component.css";
import swal from "sweetalert";
import Swal from "sweetalert2";

import React, { useEffect, useState } from "react";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  let params = useParams();

  const auth = localStorage.getItem("publics");

  const myString = "Hello, world!";
  const splittedString = myString.split(",");

  const { name, price } = product;
  const Swal = require("sweetalert2");

  const navigate = useNavigate();

  const publicsId = localStorage.getItem("publics");
  const parsed = JSON.parse(publicsId);

  const handleCart = async () => {
    if (auth) {
      let r = await fetch(
        "http://localhost:3035/alreadyincart/" + parsed._id + "/" + params.id
      ).then((res) => res.json());

      if (r.result) {
        alert("Already in cart");
      } else {
        let result = await fetch("http://localhost:3035/addtocart", {
          method: "POST",
          body: JSON.stringify({
            userid: parsed._id,
            productid: params.id,
            productimage: product.image,
            productcatagory: product.cetegory,
            productname: name,
            productprice: price,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (result) {
          swal("Added to cart!", "successfully", "success");
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login/SignUp First",
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:3035/productbyid/" + params.id)
      .then((res) => res.json())
      .then((res) => setProduct(res));
  }, []);

  return (
    <>
      <div class="container mx-auto mt-8">
        <div class="max-w-4xl mx-auto bg-white p-8 rounded shadow-md mb-10">
          <div>
            <button class="button" onClick={() => navigate("/")}>
              Back
            </button>
          </div>

          <img
            src={product.image}
            alt="Product Image"
            className="object-cover"
          />
          <br />
          <div class="mb-4">
            <h1 class="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p class="text-gray-600">
              {" "}
              <strong>Category : </strong>
              {product.category}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-xl font-bold text-gray-800">₹ {product.price}</div>
            <button
              onClick={handleCart}
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
