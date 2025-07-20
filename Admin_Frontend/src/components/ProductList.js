import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:3035/products");
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:3035/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  const searchHandle = async (event)=>{
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:3035/search/${key}`);
      result = await result.json()
      if(result){
        setProducts(result)
      }
    }else{
      getProducts();
    }
  }
  return (
    <>
      <div className="product-list">
        <h3>Product List</h3>
        <input
          type="text"
          className="search-product-box"
          placeholder="Search Product"
          onChange={searchHandle}
        />
        <ul>
          <li>S. No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Opration</li>
        </ul>
        {products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>₹ {item.price}</li>
            <li>{item.category}</li>
            <li>
              <button
                onClick={() => deleteProduct(item._id)}
                style={{ marginRight: "10px" }}
              >
                Delete
              </button>
              <Link
                to={"/update/" + item._id}
                style={{
                  backgroundColor: "lightgrey",
                  color: "black",
                  border: "1px solid black",
                  padding: "1px 5px",
                  display: "inline-block",
                }}
              >
                Update
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
