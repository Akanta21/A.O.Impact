const Order = require('../models/order')

// stripe
const stripe = require('stripe')('sk_test_u96ESOKNvAs6hJbmPqIeRptf')

// create new order
function newOrder (req, res) {
  const order = new Order(req.body)
  order.save((err, order) => {
    console.log(order)
    if (err) return res.status(401).json({error: 'unable to create new order'})
    res.status(201).json(order)
  })
}
// list all available orders
function getAllOrders (req, res) {
  Order.find({}, function (err, ordersArray) {
    if (err) return res.status(401).json({error: 'orders not found'})
    res.status(201).json(ordersArray)
  })
}
// get individual user's order
function getOrdersByUser (req, res) {
  const userEmail = req.get('User-Email')
  Order.find({customer_email: userEmail}, (err, userOrders) => {
    if (err || !userOrders) return res.status(401).json({error: 'invalid user, orders not found'})
    res.status(200).json(userOrders)
  })
}
function makeCharges (req, res) {
  console.log(req.body.stripeToken)
  stripe.charges.create({
    amount: req.body.total, // Amount in cents
    currency: 'sgd',
    source: req.body.stripeToken,
    description: req.body.email
  }, function (err, charge) {
    if (err && err.type === 'StripeCardError') return res.status(401).json({error: 'Card error'})
    res.status(200).json(charge)
  })
}
module.exports = {
  newOrder: newOrder,
  getAllOrders: getAllOrders,
  getOrdersByUser: getOrdersByUser,
  makeCharges: makeCharges
}
