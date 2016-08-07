const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  picture: {type: String, required: true},
  stock: {type: Number, required: true},
  categories: [{type: String, required: true}],
  updated_at: {type: Date, default: Date.now}
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
