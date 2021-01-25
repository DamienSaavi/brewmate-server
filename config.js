const mongoose = require('mongoose')
const passport = require('passport')
const Users = require('./user')

mongoose.connect('mongodb://localhost/brewmate',
  { useNewUrlParser: true, useUnifiedTopology: true })

passport.use(Users.createStrategy())
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())

module.exports = passport