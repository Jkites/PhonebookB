const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(morgan(':method :url :status :response-time ms :body'))
app.use(express.json())
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.post('/api/persons', (request, response) => {
    //onst person = request.body
    //console.log(person)
    //response.json(person)
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id))) 
    : 0

    const person = request.body
    if (persons.some((curr)=>{return person.name===curr.name})) {
        return response.status(400).json({
            error: 'Name already exists'
        })
    } else if (!(person.name) || !(person.number)) {
        return response.status(400).json({
            error: 'Missing required fields name or number'
        })
    }
    person.id = String(maxId + 1)

    persons = persons.concat(person)

    response.json(person)
    //morgan('tiny')
})
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    const res = '<p>Phonebook has info for </p>'
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})