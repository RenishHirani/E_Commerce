import React, { useEffect, useState } from "react";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, [orders]);

  const getOrders = async () => {
    const id = JSON.parse(localStorage.getItem("publics"))._id;
    fetch("http://localhost:3035/myorder/" + id)
      .then((res) => res.json())
      .then((res) => setOrders(res));
  };

  const auth = localStorage.getItem("publics");

  return (
    <>
      <div className="container">
        <div className="row my-4">
          <div className="text-center h3">My Orders</div>
        </div>

        {orders.length > 0 ? (
          <div className="row">
            <div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#Order ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) => (
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.email}</td>
                      <td>{item.dateordered}</td>
                      <td>{item.total}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="h2 row my-20">
            <div className="col text-center text-red-500">
              Nothing Ordered Yet
            </div>
          </div>
        )}
      </div>
    </>
  );
}
