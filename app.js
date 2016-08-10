// SETTING UP THE DEPENDENCIES FOR APP.JS
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes/route')
const app = express()

const port = process.env.PORT || 3000

// Middleware
app.use(morgan('dev'))

// CREATING THE APP
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, PATCH')
  next()
})

// Routes (after body parser, because we need to read the body)
app.use(routes)
app.use('/', routes)

app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI)

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = app
