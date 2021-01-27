const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);
const passport = require('./config')
const bodyParser = require('body-parser')
const router = require('./routes.js')
const app = express()

mongoose.connect('mongodb://localhost/brewmate',
  { useNewUrlParser: true, useUnifiedTopology: true })

const expressSession = session({
  secret: process.env.sessionSecret || 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
})

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession)
app.use(passport.initialize())
app.use(passport.session())

app.use(router)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('App listening on port ' + port))
