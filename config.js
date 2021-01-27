const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./user')

passport.use(new LocalStrategy({
    usernameField: 'email',
  },Users.authenticate()));
passport.use(Users.createStrategy())
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())

module.exports = passport