const mongoose = require('mongoose')
// const config = require('./utils/config')
// //const password = process.argv[2]

// const url = config.MONGODB_URI

// mongoose.set('strictQuery',false)

// console.log('connecting to', url)
// mongoose.connect(url)
//   .then(() => {
//     console.log('connected to MongoDB')
//   })
//   .catch(error => {
//     console.log('error connecting to MongoDB:', error.message)
//   })
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: String,
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', personSchema)