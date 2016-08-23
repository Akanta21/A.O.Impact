const Item = require('../models/product')

// Show all available Items
function getAllItems (req, res) {
  Item.find({}, function (err, itemsArray) {
    if (err) return res.status.json({error: '/getAllItems'})
    res.status(200).json(itemsArray)
  })
}
// Show all available Items
function getOneItem (req, res) {
  const id = req.params.id
  Item.find({_id: id}, function (err, item) {
    if (err) return res.status.json({error: '/getOneItem'})
    res.status(200).json(item)
  })
}
// create new item
function newItem (req, res) {
  const item = new Item(req.body)
  item.save((err, item) => {
    // console.log(item)
    if (err) return res.status(401).json({error: 'unable to create new item'})
    res.status(201).json(item)
  })
}

// update a new item by id
function updateItem (req, res) {
  const id = req.params.id
  Item.findById({_id: id}, function (err, item) {
    if (err || !item) return res.status(401).json({err: err})
    item.title = req.body.title
    item.price = req.body.price
    item.description = req.body.description
    item.categories = req.body.categories
    item.stock = req.body.stock
    item.save(function (error, user) {
      if (error)res.status(422).json({message: 'Could not update product.'})
      else res.status(200).redirect('/products')
    })
  })
}
// update a new item by id
function popularItem (req, res) {
  const id = req.params.id
  Item.findById({_id: id}, function (err, item) {
    if (err || !item) return res.status(401).json({err: err})
    console.log(req.body)
    item.stock = req.body.stock
    item.save(function (error, user) {
      if (error)res.status(422).json({message: 'Could not update product.'})
      else res.status(200).json({message: 'Succesfully updated'})
    })
  })
}

// delete a makan place by id
function deleteItem (req, res) {
  let id = req.params.id

  Item.remove({_id: id}, (err) => {
    if (err) return res.json({message: 'could not delete post b/c: ' + err})
    res.status(200).json({message: 'product deleted!'})
  })
}

module.exports = {
  newItem: newItem,
  updateItem: updateItem,
  popularItem: popularItem,
  deleteItem: deleteItem,
  getAllItems: getAllItems,
  getOneItem: getOneItem
}
