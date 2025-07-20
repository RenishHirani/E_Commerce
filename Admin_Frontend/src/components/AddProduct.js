import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [category,setCategory] = useState("");  

  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3035/categories")
      .then((res) => res.json())
      .then((res) => setCategoryName(res));
  }, []);
  const options = categoryName.map((val) => (
    <option value={val.categoryName}>{val.categoryName}</option>
  ));

  const addProduct = async () => {
    if (!name || !price || !company || !image) {
      setError(true);
      return false;
    }

    console.warn(name, price, categoryName, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:3035/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, company, image, category,userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn({ ADDED: result });
    navigate("/");
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Add Product</h1>

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && (
        <span className="invalid-input">Enter Valid Name</span>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid price</span>
      )}

      <select
        onChange={(e) => setCategory(e.target.value)}
        id="uname"
        className="inputBox"
        value={category}
      >
        {options}
      </select>
      {error && !categoryName && (
        <span className="invalid-input">Enter Valid Category</span>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="invalid-input">Enter Valid Company</span>
      )}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Image"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      {error && !company && (
        <span className="invalid-input">Enter Valid Company</span>
      )}

      <button onClick={addProduct} className="signupbutton">
        Add Product
      </button>
    </div>
  );
}
