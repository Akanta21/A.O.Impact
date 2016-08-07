const User = require('../models/user')

function signIn (req, res) {
  const userParams = req.body
  User.findOne({email: userParams.email}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'user or email not found'})
    user.authenticate(userParams.password, (err, isMatch) => {
      // console.log(isMatch)
      if (!isMatch) return res.status(401).json({err: 'email or password is invalid'})
      res.status(200).json({message: 'user logged in', auth_token: user.auth_token})
    })
  })
}
function userLoggedIn (req, res, next) {
  const userEmail = req.get('User-Email')
  const authToken = req.get('Auth-Token')
  if (!userEmail || !authToken) return res.status(401).json({error: 'unauthorised'})

  User.findOne({email: userEmail, auth_token: authToken}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'unauthorised'})
    req.currentUser = user
    next()
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
function editUser (req, res, next) {
  User.findOne({ auth_token: req.get('Auth-Token') }, (err, user) => {
    if (err) res.status(401).json({error: 'Cannot find user'})
    else {
      console.log(user)
      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password
      user.save(function (err) {
        if (err) res.status(400).json({error: 'cannot save user'})
        res.status(201).json({message: 'User successfully updated!'})
        next()
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
  signUp: signUp,
  editUser: editUser,
  isAdmin: isAdmin,
  deleteUser: deleteUser,
  getAllUsers: getAllUsers
}
