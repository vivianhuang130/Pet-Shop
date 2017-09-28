const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  logoUrl: {type: String},
  price: {type: Number},
  images: [{ type: String }]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
