const mongoose = require('mongoose')
const db = mongoose.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
connection.once('open', () => {
	console.log('MongoDB connection established successfully')
})

module.exports = db