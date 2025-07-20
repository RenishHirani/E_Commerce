const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
require('./db/config');
const User = require("./db/User")
const Product = require("./db/Product")
const Category = require("./db/Category")
const Public = require("./db/public")
const Order = require("./db/Order")
const Cart = require("./db/Cart")

const app = express();

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save(); 
    result = result.toObject();
    delete result.password;
    res.send(result)
})

app.post('/register/user', async (req, res) => {
    let public = new Public(req.body);
    let result = await public.save(); 
    result = result.toObject();
    delete result.password;
    res.send(result)
})

app.post("/login", async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            res.send(user)
        }
        else {
            res.send({ result: 'No user Found' })
        }
    }
    else {
        res.send({ result: 'No user Found' })
    }
})

app.post("/login/user", async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let public = await Public.findOne(req.body).select("-password")
        if (public) {
            res.send(public)
        }
        else {
            res.send({ result: 'No user Found' })
        }
    }
    else {
        res.send({ result: 'No user Found' })
    }
})

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    result = result.toObject();
    res.send(result)
})

app.post("/add-category", async (req, res) => {
    let category = new Category(req.body);
    let result = await category.save();
    res.send({"/add-category-ROUTE":result})
})

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result)
        res.send(result)
    else
        res.send({ result: "No Record Found" })
})

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.get('/categories', async (req, res) => {
    let cate = await Category.find();
    if (cate.length > 0) {
        res.send(cate)
    }
    else {
        res.send({ result: "No Products found" })
    }
})

app.get('/products', async (req,res)=>{
    let products = await Product.find();
    if(products.length>0)
    {
        res.send(products)
    }
    else{
        res.send({result:"No Products found"})
    }
})  

app.delete("/product/:id",async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
})

app.get("/search/:key", async (req,res)=>{
    let result = await Product.find({
        "$or":[
            {
                name: { $regex: req.params.key}
            },
            // {
            //     category: { $regex: req.params.key}
            // }  
        ]
    });
    res.send(result);
})

app.get("/productbyid/:id", async (req, res) => {
    // res.send(req.params.id)
    const result = await Product.findOne({ _id: req.params.id })
    res.send(result)
})

app.get("/productbycategory/:category", async (req, res) => {
    let result = await Product.find({ category: req.params.category })
    if (result)
        res.send(result)
    else
        res.send({ result: "NO REcord Found" })
})

app.post('/placeorder', async (req, res) => {
    let ord = new Order(req.body);
    let result = await ord.save();
    result = await result.toObject();
    res.send(result)
})

app.get("/myorder/:id", async (req, res) => {
    let result = await Order.find({ userid: req.params.id })
    if (result)
        res.send(result)
    else
        res.send({ result: "NO REcord Found" })
})

app.get("/orders", async (req, res) => {
    let result = await Order.find()
    if (result)
        res.send(result)
    else
        res.send({ result: "NO REcord Found" })
})

app.put("/updatestatus/:id", async (req, res) => {
    let result = await Order.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.post('/addtocart', async (req, res) => {
    let cart = new Cart(req.body);
    let result = await cart.save();
    result = await result.toObject();
    res.send(result)
})

app.get("/cartlist/:id", async (req, res) => {
    let result = await Cart.find({ userid: req.params.id })
    if (result)
        res.send(result)
    else
        res.send({ result: "NO REcord Found" })
})

app.delete("/deletecart/:id", async (req, res) => {
    const result = await Cart.deleteOne({ productid: req.params.id })
    res.send(result)
})

app.put("/updatequentity/:uid/:pid", async (req, res) => {
    let result = await Cart.updateOne(
        {
            $and: [
                { userid: req.params.uid },
                { productid: req.params.pid }
            ]
        },
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.get("/countincart/:id", async (req, res) => {
    let result = await Cart.countDocuments({ userid: req.params.id })
    // res.json({ result });
    if (result)
        res.send({ result })
    else
        res.send({ result: 0 })
})

app.get("/alreadyincart/:uid/:pid", async (req, res) => {
    let result = await Cart.find({
        $and: [
            { userid: req.params.uid },
            { productid: req.params.pid }
        ]
    })

    if (result.length > 0) {
        res.send({ result });
    } else {
        res.send({ message: 'Not found' });
    }
})

app.listen(3035)