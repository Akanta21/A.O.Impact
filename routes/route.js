var express = require('express')
var router = express.Router()

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
router.patch('/profile', userController.editUser)
router.get('/products', productController.getAllItems)
router.get('/product/:id', productController.getOneItem)

// Admin specific routes for users control
router.get('/allusers', userController.isAdmin, userController.getAllUsers)
router.delete('/user/:id', userController.isAdmin, userController.deleteUser)

// Admin specific routes for managing inventories
router.post('/newproduct', userController.isAdmin, productController.newItem)
router.patch('/product/:id', userController.isAdmin, productController.updateItem)
router.delete('/product/:id', userController.isAdmin, productController.deleteItem)

module.exports = router
