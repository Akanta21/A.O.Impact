var express = require('express')
var router = express.Router()
var request = require('request')

const userController = require('../controllers/user_controller')
const productController = require('../controllers/product_controller')

/* GET home page. */
router.get('/', function (req, res) {
  // console.log('hello')
  res.json({message: 'halo'})
})

// Routes for customers
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.get('/user', userController.userProfile)
router.patch('/profile', userController.editUser)
router.patch('/addpurchase', userController.addPurchaseHistory)
router.get('/products', productController.getAllItems)
router.get('/product/:id', productController.getOneItem)
router.post('/popular/:id', userController.userLoggedIn, productController.popularItem)

// Admin specific routes for users control
router.get('/allusers', userController.isAdmin, userController.getAllUsers)
router.delete('/user/:id', userController.isAdmin, userController.deleteUser)

// Admin specific routes for managing inventories
router.post('/newproduct', userController.isAdmin, productController.newItem)
router.patch('/product/:id', userController.isAdmin, productController.updateItem)
router.delete('/product/:id', userController.isAdmin, productController.deleteItem)

//  instagram call
router.get('/api/', (req, res) => {
  console.log(req.query.location)
  var location = req.query.location
  request('https://www.instagram.com/' + location + '/media/', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(response.body)
      console.log(info.items)
      res.send(info.items)
    } else if (response.statusCode === 304) {
      res.status.json({message: 'Private account'})
    } else {
      res.status(422).json({message: 'User account not found'})
    }
  })
})
module.exports = router
