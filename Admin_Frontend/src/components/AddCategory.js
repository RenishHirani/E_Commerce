import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const addCategory = async () => {
    if (!categoryName) {
      setError(true);
      return false;
    }

    console.warn(categoryName);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:3035/add-category", {
      method: "post",
      body: JSON.stringify({ categoryName, userId }),
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
      <h1>Add Category</h1>

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Category Name"
        onChange={(e) => setCategoryName(e.target.value)}
        value={categoryName}
      />
      {error && !addCategory && (
        <span className="invalid-input">Enter Valid Category Name</span>
      )}

      <button onClick={addCategory} className="signupbutton">
        Add Category
      </button>
    </div>
  );
}
