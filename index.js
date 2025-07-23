//require('dotenv').config()
const app = require('./app') // the actual Express application
const config = require('./util/config')
const logger = require('./util/logger')
// const express = require('express')
// const app = express()
// var morgan = require('morgan')
// const Person =  require('./models/person')
// const personsRouter = require('./controllers/notes')
// //const cors = require('cors')
// app.use(express.static('dist'))
// //app.use(cors())
// app.use(morgan(':method :url :status :response-time ms :body'))
// app.use(express.json())

// let persons = [
//     {
//       "id": "1",
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": "2",
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": "3",
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": "4",
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]

// morgan.token('body', (req) => { return JSON.stringify(req.body) })
// app.use('/api/persons', personsRouter)

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }
// app.use(errorHandler)
//const PORT = process.env.PORT || 3001
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})