const express = require('express')
const router = express.Router()

const todos = require('./modules/todos')
const users = require('./modules/users')

router.use('/todos', todos)
router.use('/users', users)
router.get('/', (req, res) => {
  res.redirect('/todos')
})

module.exports = router