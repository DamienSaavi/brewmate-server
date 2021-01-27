const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login')
const Users = require('./user')
const passport = require('./config')

router.post('/login', (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      if (err)
        res.status(500).send(err)

      if (!user)
        res.status(403).send(info)

      req.logIn(user, (err) => {
        if (err)
          res.status(500).send(err)
        else
          res.status(200).redirect('/user')
      })

    })(req, res, next)
})

router.post('/register', (req, res, next) => {
  console.log(req.body)
  Users.register(new Users({ email: req.body.email, name: req.body.name }), req.body.password, (err, user) => {
    if (err)
      console.log(err)
    else
      res.status(200).redirect('/user')
    return
  })
})

router.get('/user',
  connectEnsureLogin.ensureLoggedIn('/'),
  (req, res) => res.send({ user: req.user })
)

router.get('/', (req, res, next) => {
  res.send(`you're not logged in :<`)
  next()
})

module.exports = router