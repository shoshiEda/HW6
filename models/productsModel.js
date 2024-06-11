const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    color:String
})

module.exports = mongoose.model("product", productSchema)