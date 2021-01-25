const express = require('express')
const passport = require('./config')
const Users = require('./user')
const bodyParser = require('body-parser')
const expressSession = require('express-session')({
  secret: process.env.sessionSecret || 'secret',
  resave: false,
  saveUninitialized: false
})
const router = require('./routes.js')
const app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession)
app.use(passport.initialize())
app.use(passport.session())

app.use(router)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('App listening on port ' + port))
