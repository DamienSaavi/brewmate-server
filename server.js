const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);
const passport = require('./config')
const bodyParser = require('body-parser')
const router = require('./routes.js')
const app = express()

const dotenv = require('dotenv')
dotenv.config()


mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

const expressSession = session({
  secret: process.env.SESSION_SECRET,
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

const port = process.env.PORT
app.listen(port, () => console.log('App listening on port ' + port))
