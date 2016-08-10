const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const uniqueValidator = require('mongoose-unique-validator')
const Product = require('./product')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  email: { type: String, required: true, unique: true, uniqueCaseInsensitive: true, match: /\S+@\S+\.\S+/ },
  password: { type: String, required: true, minlength: 6 },
  auth_token: { type: String, unique: true },
  purchase_history: [{ type: mongoose.Schema.Types.Object, ref: 'Product' }]
})

UserSchema.pre('save', function (next) {
  const user = this
  // here, we use bcrypt to generate salt, with 8 iterations.
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(8, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
  // GENERATE AUTHENTICATION TOKEN
  if(!user.auth_token) user.auth_token = uuid.v4()
})

UserSchema.methods.authenticate = function (password, callback) {
  bcrypt.compare(password, this.password, callback)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
