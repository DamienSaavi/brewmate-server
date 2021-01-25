const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login')
const Users = require('./user')
const passport = require('./config')

router.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err)
        return next(err)
  
      if (!user)
        return res.redirect('/login?info=' + info)
  
      req.logIn(user, (err)=> {
        if (err)
          return next(err)
        else
            console.log(user)
        return res.redirect('/')
      })
  
    })(req, res, next)
})

router.post('/register', (req, res, next) => {
    Users.register(new Users({username: req.body.username}), req.body.password, (err, user) => {
       
        if (err)
            console.log(err)
        else
            console.log(user)
    })
    next()
})
  
router.get('/user',
    connectEnsureLogin.ensureLoggedIn('/'),
    (req, res) => res.send({user: req.user})
)

router.get('/', (req, res, next) => {
    res.send('hello')
    next()
})

module.exports = router