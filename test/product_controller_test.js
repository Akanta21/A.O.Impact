/* globals describe it after*/
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
require('../app')
const Product = require('../models/product')

 // process.env.ADMIN_EMAIL,

describe('SHOW /products', function () {
  this.timeout(5000)
  it('should return all the products', (done) => {
    api.get('/products')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  // it('should return one product', (done) => {
  //   api.get('/product/57a6e5767f206a068bd4b6bd')
  //   .end((error, response) => {
  //     expect(error).to.be.a('null')
  //     expect(response.body).to.be.an('array')
  //     expect(response.body[0].title).to.eq('Bro')
  //     done()
  //   })
  // })
})
describe('Creation of a new product', function () {
  var id
  this.timeout(5000)
  it('should create a new product', (done) => {
    api.post('/newproduct')
    .set('Accept', 'application/json')
    .set('User-Email', process.env.ADMIN_EMAIL)
    .send({
      'title': 'BadAss',
      'price': 2.50,
      'description': 'This is the latest item',
      'picture': 'img.url',
      'stock': 100,
      'categories': 'apparel'
    }).end((err, res) => {
      expect(err).to.be.null
      id = res.body._id
      done()
    })
  })
  after((done) => {
    Product.findOne({_id: id}, (err, res) => {
      expect(err).to.be.null
      // console.log(res)
      res.remove()
      done()
    })
  })
})
