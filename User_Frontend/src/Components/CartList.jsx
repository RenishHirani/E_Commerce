import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Link, useParams } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function ProductCards() {
  const [products, setProducts] = useState([]);

  function cartCount() {
    return <>{products.length}</>;
  }

  useEffect(() => {
    getProductForCart();
  }, []);

  const getProductForCart = async () => {
    let result = await fetch("http://localhost:3035/cartlist/" + params.id);
    result = await result.json();
    setProducts(result);
  };

  const deleteFromCart = async (id) => {
    confirmAlert({
      title: "Are You Sure Want To Remove This Item From Cart",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:3035/deletecart/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) getProductForCart();
  };

  const params = useParams();

  const [value, setValue] = useState(1); // Initialize state with default value

  const handleChange = (event) => {
    console.log(event);
    setValue(event.target.value); // Update state with new value
  };

  const updateQuentity = async () => {
    let result = await fetch(
      `http://localhost:3035/updatequentity/${params.id}`,
      {
        method: "put",
        body: JSON.stringify({ quantity: value }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = result.json();
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div>
              <MDBTypography
                tag="h3"
                className="fw-normal mb-4 ms-1 text-black"
              >
                <div className="font-bold">Your Cart</div>
              </MDBTypography>
            </div>

            {products.length == 0 ? (
              <h2>Your Is Empty</h2>
            ) : (
              <>
                {products.map((item, index) => (
                  <MDBCard className="rounded-3 mb-4">
                    <MDBCardBody className="p-4">
                      <MDBRow className="justify-content-between align-items-center">
                        <MDBCol md="2" lg="2" xl="2">
                          <MDBCardImage
                            className="cart-image ounded-3"
                            fluid
                            src={item.productimage}
                            alt="Cotton T-shirt"
                          />  
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3">
                          <p className="lead fw-normal mb-2">
                            {item.productname}
                          </p>
                          <p>
                            <span className="text-muted">
                              Category: {item.productcatagory}
                            </span>
                          </p>
                        </MDBCol>
                        <MDBCol
                          md="3"
                          lg="3"
                          xl="2"
                          className="d-flex align-items-center justify-content-around"
                        ></MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                          <MDBTypography tag="h5" className="mb-0">
                            {item.productprice}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                          <div onClick={() => deleteFromCart(item.productid)}>
                            <MDBIcon
                              className="cursor-pointer transition-transform transform hover:scale-125"
                              fas
                              icon="trash text-danger"
                              size="lg"
                            />
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                ))}
                <div className="row mt-10 mb-10">
                  <div className="col-5 "></div>
                  <Link className="col w-100" to={`/placeorder/${params.id}`}>
                    <button className="btn btn-secondary">Check Out</button>
                  </Link>
                  <div className="col "></div>
                </div>
              </>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
