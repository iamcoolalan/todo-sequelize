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

  return Todo.create({ 
    name,
    UserId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
    
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

router.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  const {name, isDone} = req.body

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      return todo.update({ 
        name,
        isDone : isDone === 'on'
      })
    })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})


module.exports = router