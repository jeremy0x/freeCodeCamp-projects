const mongoose = require('mongoose')
const db = mongoose.connect(process.env.DB, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', () => {
  console.log('Connected to MongoDB')
})

module.exports = db
