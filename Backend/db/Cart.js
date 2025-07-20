const mongoose = require('mongoose') 

const cartSchema = new mongoose.Schema({
    productimage : String,
    productname : String,
    productcatagory : String,
    productid : String
})

module.exports = mongoose.model("cart",cartSchema)