const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length < 5) {
  console.log('provide all required args')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://sunsenlin0:${password}@cluster0.ufxrjxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

person.save().then(() => {
  console.log(`saved ${person.name} number ${person.number} to phonebook`)
  console.log('Phonebook')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
  //mongoose.connection.close()
})