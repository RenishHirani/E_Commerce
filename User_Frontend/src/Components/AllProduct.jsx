import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import "./Component.css";

function AllProduct() {
  const [category, setCategory] = useState("");
  // const optionsOfCategory = [
  //   { value: "Shirt", label: "Shirt" },
  //   { value: "Pent", label: "Pent" },
  //   { value: "Tshirt", label: "T Shirt" },
  // ];
  const [categoryName, setCategoryName] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3035/categories")
      .then((res) => res.json())
      .then((res) => setCategoryName(res)); 
  }, []);
  const optionsOfCategory = categoryName.map((val) => (
    <option value={val.categoryName}>{val.categoryName}</option>
  ));

  const [products, setProducts] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    fetch("http://localhost:3035/products")
      .then((res) => res.json())
      .then((res) => setProducts(res));
  };

  useEffect(() => {
    fetch(`http://localhost:3035/productbycategory/${category}`)
      .then((res) => res.json())
      .then((res) => setProductByCategory(res));
  }, [category]);

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3035/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/productbyid/${id}`);
  }

  return (
    <>
      <Drawer />
      <MDBContainer fluid className="my-5 text-center">
        <div className="row">
          <div className="col" style={{ textAlign: "left" }}>
            <span>Catagory : </span>
            <select
              className="inputBox"
              id="dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {/* {optionsOfCategory.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))} */}
              {optionsOfCategory}
            </select>
          </div>
          <div className="col-10 ">
            <div className="relative w-50">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                onChange={searchHandle}
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search branch name..."
                required
              />
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="products-title">Our Products</div>
        </div>

        {category ? (
          <MDBRow>
            {productByCategory.map((product) => {
              return (
                <>
                  <MDBCol md="6" lg="4" className="mb-4">
                    <MDBCard
                      className="card-hover"
                      onClick={() => handleClick(product._id)}
                    >
                      <MDBCardImage
                        className="card-image"
                        src={product.image}
                      />
                      <MDBCardBody>
                        <span href="#!" className="text-reset">
                          <h5 className="card-title mb-3">{product.name}</h5>
                        </span>
                        <span href="#!" className="text-reset">
                          <p>{product.category}</p>
                        </span>
                        <h6 className="mb-3">{product.price}</h6>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </>
              );
            })}
          </MDBRow>
        ) : (
          <MDBRow>
            {products.map((product) => {
              return (
                <>
                  <MDBCol md="6" lg="4" className="mb-4">
                    <MDBCard
                      className="card-hover"
                      onClick={() => handleClick(product._id)}
                    >
                      <MDBCardImage
                        className="card-image"
                        src={product.image}
                      />

                      <MDBCardBody>
                        <span href="#!" className="text-reset">
                          <h5 className="card-title mb-3">{product.name}</h5>
                        </span>
                        <span href="#!" className="text-reset">
                          <p>{product.category}</p>
                        </span>
                        <h6 className="mb-3">₹ {product.price}</h6>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </>
              );
            })}
          </MDBRow>
        )}
      </MDBContainer>
    </>
  );
}

export default AllProduct;
