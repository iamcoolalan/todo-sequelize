const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name

  Todo.create({ 
    name,
    UserId
  })
    .then(() => res.redirect('/'))
    
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

module.exports = router