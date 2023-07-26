const express = require('express')
const app = express()

const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')

const PORT = 3000
const routes = require('./routes/index')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(express.urlencoded({ extended: true })) //body-parser
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})