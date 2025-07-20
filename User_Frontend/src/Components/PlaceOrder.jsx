import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import swal from 'sweetalert';
export default function PlaceOrder() {

    const navigate = useNavigate()
    const params = useParams()

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductForCart()
    }, [])

    var productIds = products.map();

    const getProductForCart = async () => {
        let result = await fetch('http://localhost:3035/cartlist/' + params.id);
        result = await result.json();
        setProducts(result)
    }

    const [totalPrice, setTotalPrice] = useState(0);
    // Function to calculate the sum of product prices
    const calculateTotalPrice = () => {
        let sum = 0;
        products.forEach(product => {
            // Remove commas and convert productprice to a number
            const price = parseFloat(product.productprice.replace(/,/g, ''));
            sum += price;
        });
        return sum;
    };

    // Update the total price whenever products change
    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [products]);

    const deleteFromCart = async (id) => {
        confirmAlert({
            title: 'Are You Sure Want To Remove This Item From List',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(id)
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    const handleDelete = async (id) => {
        let result = await fetch(`http://localhost:3035/deletecart/${id}`, {
            method: "Delete"
        })
        result = await result.json()
        if (result)
            getProductForCart()
    }

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [mno, setMno] = useState('')
    const [tele, setTele] = useState('')
    const [add, setAdd] = useState('')
    const [cun, setCun] = useState('')
    const [code, setCode] = useState('')

    const placeOrder = async (e) => {

        if (fname && lname && email && mno && tele && add && cun && code) {
            let result = await fetch("http://localhost:3035/placeorder", {
                method: "post",
                body: JSON.stringify({ userid: params.id, productids: productIds, firstname: fname, lastname: lname, email: email, mobileno: mno, telephone: tele, address: add, country: cun, postcode: code, total: totalPrice, dateordered: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()

            // var result = true
            if (result) {
                swal("Order Is Submitted", "Kindly Wait For Admin Confirmation On Your Order", "success");
                e.preventDefault();
                navigate('/')
            }
        }
        else {
            alert('Please Fill All The Detail For Place Your Order')
        }
    }

    return (
        <>
            <form>
                <div className='container'>
                    <div className="row mt-4 mb-2">
                        <button className="col-1 button" onClick={() => navigate(`/cartlist/${params.id}`)}>Back</button>
                    </div>
                    <div className="row">
                        <p className='font-bold h3 mt-8'>Customer Info : </p>
                    </div>
                    <div className='row mt-2 mb-2'>

                        <div className='col '>
                            <div className='row align-items-center'>
                                <div className='col text-right '><label for="validationDefault01">First name : </label></div>
                                <div className='col me-20'><input class="input-field" type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First name" required /></div>
                            </div>
                        </div>

                        <div className='col '>
                            <div className='row align-items-center'>
                                <div className='col text-right'><label for="validationDefault01">Last name : </label></div>
                                <div className='col'><input class="input-field" type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last name" required /></div>
                            </div>
                        </div>

                        <div className='col '>
                            <div className='row align-items-center'>
                                <div className='col text-right'><label for="validationDefault01">Email : </label></div>
                                <div className='col'><input class="input-field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /></div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className='col '>
                            <div className='row align-items-center'>
                                <div className='col text-right '><label for="validationDefault01">Mobile No. : </label></div>
                                <div className='col me-20'><input maxLength={10} class="input-field" type="text" value={mno} onChange={(e) => setMno(e.target.value)} placeholder="Mobile no" required /></div>
                            </div>
                        </div>
                        <div className="col">
                            <div className='row align-items-center'>
                                <div className='col text-right'><label for="validationDefault01">Telephone No. : </label></div>
                                <div className='col'><input class="input-field" type="text" value={tele} onChange={(e) => setTele(e.target.value)} placeholder="Telephone no" required /></div>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row">
                        <p className='font-bold h3 mt-8'>Address Info : </p>
                    </div>
                    <div className='row mt-2 mb-2'>

                        <div className='col '>
                            <div className='row align-items-center'>
                                <div className='col text-right '><label for="validationDefault01">Address : </label></div>
                                <div className='col me-20 max-w-72'><textarea rows={3} class="input-field" type="text" value={add} onChange={(e) => setAdd(e.target.value)} placeholder="First name" required /></div>
                            </div>
                        </div>
                        <div className='col '>
                            <div className='row align-items-center'>
                                <div className='col text-right'><label for="validationDefault01">Country : </label></div>
                                <select value={cun} onChange={(e) => setCun(e.target.value)} class=" col custom-select mr-sm-2" id="inlineFormCustomSelect" required>
                                    <option selected>Country</option>
                                    <option value="india">India</option>
                                    <option value="america">America</option>
                                    <option value="bangladesh">Bangladesh</option>
                                </select>
                            </div>
                        </div>

                        <div className='col'>
                            <div className='row align-items-center'>
                                <div className='col text-right'><label for="validationDefault01">Zip/Postal Code : </label></div>
                                <div className='col'><input maxLength={6} class="input-field" type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="0000" required /></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <p className='font-bold h3 mt-8'>Payment Info : </p>
                    </div>
                    <div className='row mt-2 mb-2'>

                        <div className='col '>
                            <fieldset class="form-group">
                                <div class="row">
                                    <legend class="col-form-label col-sm-2 pt-0 text-right">Payment Mode : </legend>
                                    <div class="col-sm-10">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="cod" checked />
                                            <label class="form-check-label" for="gridRadios1">
                                                Cash On Delievery
                                            </label>
                                            <small id="emailHelp" class="form-text text-muted">Currently We Only Have only Cash On Delivery Facilities</small>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" disabled />
                                            <label class="form-check-label" for="gridRadios2">
                                                Debit/Credit Card
                                            </label>
                                        </div>
                                        <div class="form-check disabled">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
                                            <label class="form-check-label" for="gridRadios3">
                                                Upi
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <br />
                            <br />


                            <div className="row" style={{ display: 'grid', placeItems: 'center' }}>
                                <div className="col font-semibold h4">Products : </div>

                                {
                                    products.length > 0 ?
                                        <table className='ms-4 mt-3 mb-4 table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Price</th>
                                                    <th scope='col'></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products.map((item, index) =>
                                                        <tr>
                                                            <td>{item.productname}</td>
                                                            <td>{item.productcatagory}</td>
                                                            <td>{item.productprice}</td>
                                                            <td>
                                                                <MDBIcon onClick={() => deleteFromCart(item.productid)} style={{ color: 'blue' }} className="cursor-pointer transition-transform transform hover:scale-125" far icon="times-circle" />
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        :
                                        <p className='h4 my-3'> : | Nothing In Cart To Place Order</p>
                                }


                            </div>
                            <div className='h3'>Your Total Amount : <span className='font-semibold'>₹ {totalPrice} (total products * {products.length})</span></div>
                        </div>
                    </div>
                    <div className="row mt-10 mb-10">
                        <div className="col "></div>

                        <button type='submit' onClick={(e) => placeOrder(e)} className='col-6 btn btn-primary'>Place Order</button>

                        <div className="col "></div>

                    </div>
                </div>
            </form>
        </>
    )
}
