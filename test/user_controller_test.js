/* globals describe it context after*/
const expect = require('chai').expect
const supertest = require('supertest')
require('../app')
const api = supertest('http://localhost:3000')
const User = require('../models/user')

describe('Sessions', () => {
  var id
  context('signup /signup', function () {
    this.timeout(5000)
    it('Should create a user', (done) => {
      api.post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'username',
        email: 'user@email.com',
        password: '123456'
      }).end((err, res) => {
        expect(err).to.be.null
        id = res.body._id
        done()
      })
    })
    context('signin /signin', () => {
      it('Should allow user to sign in', function (done) {
        this.timeout(5000)
        api.post('/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'user@email.com',
          password: '123456'
        }).end((err, res) => {
          expect(err).to.be.null
          console.log(res.body.message)
          expect(res.body.message).to.eq('user logged in')
          done()
        })
      })
    })
    after((done) => {
      User.findOne({name: 'username'}, (err, res) => {
        expect(err).to.be.null
        res.remove()
        done()
      })
    })
  })
})
// invalid signup
describe('Invalid inputs for', () => {
  context('POST /signup', () => {
    it('should not accept empty name', (done) => {
      api.post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: '',
        email: 'haha@gmail.com',
        password: '123456'
      }).expect(401, done)
    })
    it('should not accept empty email', (done) => {
      api.post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'haha',
        email: '',
        password: '123456'
      }).expect(401, done)
    })
    it('should not accept empty email', (done) => {
      api.post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'test',
        email: '',
        password: '123456'
      }).expect(401, done)
    })
    it('should not accept email with invalid format', (done) => {
      api.post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'test',
        email: 'email',
        password: '123456'
      }).expect(401, done)
    })
    it('should not accept empty password', (done) => {
      api.post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'test',
        email: 'email@gmail.com',
        password: ''
      }).expect(401, done)
    })
    it('should not accept password with length lesser than 6', (done) => {
      api.post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'test',
        email: 'email@gmail.com',
        password: '1234'
      }).expect(401, done)
    })
  })
})

// Invalid signin
describe('Insufficient signin info', () => {
  context('POST /signin', () => {
    it('should not allow empty password field', (done) => {
      api.post('/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: ''
      }).expect(401, done)
    })
  })
  it('should not allow empty email field', (done) => {
    api.post('/signin')
    .set('Accept', 'application/json')
    .send({
      email: '',
      password: '123456'
    }).expect(401, done)
  })
})
