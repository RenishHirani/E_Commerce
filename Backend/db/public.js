const mongoose = require('mongoose') 

const publicSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})  

module.exports = mongoose.model("public",publicSchema)