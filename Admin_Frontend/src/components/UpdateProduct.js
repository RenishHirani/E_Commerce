import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();

  useEffect(() => {
    // console.warn(params)
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:3035/product/${params.id}`);
    result = await result.json();
    // console.warn(result)
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
    setImage(result.image);
  };

  const navigate = useNavigate();

  const UpdateProduct = async () => {
    // console.warn(name,price,cetegory,company)
    let result = await fetch(`http://localhost:3035/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company, image }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = result.json();
    navigate("/");
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Update Product</h1>

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      {/* <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      /> */}
      <select
        name="category"
        className="inputBox"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="shirt">Shirt</option>
        <option value="tshirt">T Shirt</option>
      </select>

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Image"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />

      <button onClick={UpdateProduct} className="signupbutton">
        Update Product
      </button>
    </div>
  );
}
