const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  const error = req.flash().error || []
  res.render('login', { error })
})

router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  failureRedirect: '/users/login',
  successRedirect: '/'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }

  if (errors.length) {
    console.log(errors)
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errors
    })
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        errors.push({ message: '此信箱已經註冊過' })
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          errors
        })
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })

})

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '你已成功登出!')
  res.redirect('/users/login')
})


module.exports = router