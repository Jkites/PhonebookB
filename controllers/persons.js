const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.post('/', (request, response, next) => {
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
  Person.findOne({ name:person.name }).then( existingPerson => {
    if (existingPerson) {
      existingPerson.number = person.number
      existingPerson.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
        .catch( error => next(error))
    } else {
      //person.id = String(maxId + 1)
      const realPerson = new Person({
        //id: person.id,
        name: person.name,
        number: person.number,
      })
      //persons = persons.concat(realPerson)

      realPerson.save().then(savaedPerson => {
        response.json(savaedPerson)
      //morgan('tiny')
      })
        .catch( error => next(error))
    }
  })
    .catch( error => next(error))

})

// app.get('/api/persons', (request, response) => {
//   response.json(persons)
// })
personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  //const person = persons.find(person => person.id === id)

  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})
personsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  //persons = persons.filter(person => person.id !== id)
  Person.findByIdAndDelete(id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
  response.status(204).end()
})
personsRouter.put('/:id', (request, response, next) => {
  //const { id, name, number } = request.body
  const number = request.body.number

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

module.exports = personsRouter