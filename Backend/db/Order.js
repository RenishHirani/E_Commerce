const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: String,
  firstname: String,
  email: String,
  dateordered: String,
  total: String,
  status: String,
});

module.exports = mongoose.model("Order", orderSchema);
