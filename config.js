const mongoose = require('mongoose')
const Users = require('./user.js')

mongoose.connect('mongodb://localhost/brewmate',
  { useNewUrlParser: true, useUnifiedTopology: true })

passport.use(Users.createStrategy())
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())

module.exports = passport