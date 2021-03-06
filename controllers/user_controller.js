const User = require('../models/user')

function signIn (req, res) {
  const userParams = req.body
  console.log(userParams)
  User.findOne({email: userParams.email}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'user or email not found'})
    user.authenticate(userParams.password, (err, isMatch) => {
      // console.log(isMatch)
      if (!isMatch) return res.status(401).json({err: 'email or password is invalid'})
      res.status(200).json({message: 'user logged in', user})
    })
  })
}
function userLoggedIn (req, res, next) {
  const userEmail = req.get('User-Email')
  const authToken = req.get('Auth-Token')
  if (!userEmail || !authToken) return res.status(401).json({error: 'unauthorised'})

  User.findOne({email: userEmail, auth_token: authToken}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'unauthorised'})
    // res.status(200).json({currentUser: user})
    next()
  })
}
function userProfile (req, res, next) {
  const authToken = req.get('Auth-Token')
  if (!authToken) return res.status(401).json({error: 'unauthorised'})

  User.findOne({auth_token: authToken}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'unauthorised'})
    else {
      res.status(201).json({user})
    }
  })
}

// CRUD function of individual user
function signUp (req, res) {
  const user = new User(req.body)
  // console.log(req.body)
  user.save((err, user) => {
    // console.log(err)
    if (err) return res.status(401).json({error: '/user creation error 1'})
    res.status(201).json({message: 'welcome! ', user})
  })
}
function editUser (req, res) {
  console.log(req.get('Auth-Token'))
  User.findOne({ auth_token: req.get('Auth-Token') }, (err, user) => {
    if (err || !user) res.status(401).json({error: 'Cannot find user'})
    else {
      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password
      user.save(function (err) {
        if (err) return res.status(400).json({error: 'cannot save user'})
        res.status(201).json({user})
      })
    }
  })
}
function addPurchaseHistory (req, res) {
  console.log('first pass')
  User.findOne({ auth_token: req.get('Auth-Token') }, (err, user) => {
    if (err) res.status(401).json({error: 'Cannot find user'})
    else {
      console.log('second pass')
      user.purchase_history.push(req.body.purchase_history)
      user.save(function (err) {
        if (err) return res.status(400).json({error: 'cannot save user'})
        res.status(201).json({message: 'User successfully updated!'})
      })
    }
  })
}
// Admin's power!
function isAdmin (req, res, next) {
  const userEmail = req.get('User-Email')
  if (userEmail !== process.env.ADMIN_EMAIL) return res.status(401).json({error: 'unauthorised access'})
  next()
}
function getAllUsers (req, res) {
  User.find({}, function (err, usersArray) {
    if (err) return res.status(401).json({error: '/users getAllUsers error 1'})
    res.status(201).json(usersArray)
  })
}
function deleteUser (req, res, next) {
  User.findOne({_id: req.params.id }, (err, user) => {
    console.log(user)
    if (err || !user) return res.status(401).json({error: 'Email or password is invalid'})
    user.remove()
    res.status(201).json({message: 'User is deleted'})
  })
}
module.exports = {
  signIn: signIn,
  userLoggedIn: userLoggedIn,
  userProfile: userProfile,
  signUp: signUp,
  editUser: editUser,
  addPurchaseHistory: addPurchaseHistory,
  isAdmin: isAdmin,
  deleteUser: deleteUser,
  getAllUsers: getAllUsers
}
