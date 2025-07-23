const express = require('express')
const mongoose = require('mongoose')
const config = require('./util/config')
const logger = require('./util/logger')
const middleware = require('./util/middleware')
const personsRouter = require('./controllers/persons')
const Person =  require('./models/person')

const app = express()
app.use(express.json())
logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
//app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
  Person.find({}).then( persons => {
    //const res = '<p>Phonebook has info for </p>'
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
  })
})
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app