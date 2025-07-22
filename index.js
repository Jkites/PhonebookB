require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
//const cors = require('cors')
app.use(express.static('dist'))
//app.use(cors())
app.use(morgan(':method :url :status :response-time ms :body'))
app.use(express.json())

const Person =  require('./models/person')
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
morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.post('/api/persons', (request, response, next) => {
    //onst person = request.body
    //console.log(person)
    //response.json(person)
    // const maxId = persons.length > 0
    // ? Math.max(...persons.map(n => Number(n.id))) 
    // : 0

    const person = request.body
    //persons.some((curr)=>{return person.name===curr.name})
    // if (Person.findOne({}).then(persons=>{
    //   persons.some((curr)=>{return person.name===curr.name})
    // })) {
    //     // return response.status(400).json({
    //     //     error: 'Name already exists'
    //     // })
    // } else 
    if (!(person.name) || !(person.number)) {
        return response.status(400).json({
            error: 'Missing required fields name or number'
        })
    }
    //const personName = person.name
    Person.findOne({ name:person.name }).then(existingPerson=> {
      if (existingPerson) {
        existingPerson.number = person.number
        existingPerson.save().then(updatedPerson => {
          response.json(updatedPerson)
        })
        .catch(error=>next(error))
      } else {
        //person.id = String(maxId + 1)
        const realPerson = new Person({
          //id: person.id,
          name: person.name,
          number: person.number,
        })
        //persons = persons.concat(realPerson)

        realPerson.save().then(savaedPerson=>{
          response.json(savaedPerson)
        //morgan('tiny')
        })
        .catch(error=>next(error))
      }
    })
    .catch(error=>next(error))
    
})
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// app.get('/api/persons', (request, response) => {
//   response.json(persons)
// })
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons=>{
    const res = '<p>Phonebook has info for </p>'
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
  })
})
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  //const person = persons.find(person => person.id === id)
  
  Person.findById(id).then(person=>{
    if (person) {
    response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  //persons = persons.filter(person => person.id !== id)
  Person.findByIdAndDelete(id).then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  response.status(204).end()
})
app.put('/api/persons/:id', (request, response) => {
  const { id, name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      //person.name = content
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})