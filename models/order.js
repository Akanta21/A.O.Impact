const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  customer_email: {type: String, required: true},
  orders: [mongoose.Schema.Types.Mixed],
  price: {type: Number, required: true},
  paid: {type: Boolean, default: null},
  updated_at: {type: Date, default: Date.now}
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order
