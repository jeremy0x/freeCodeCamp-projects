const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const bodyParser = require('body-parser')

// Database Connection
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
connection.once('open', () => {
	console.log('MongoDB database connection established successfully')
})

// Defining the Schema
const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	log: [
		{
			date: String,
			duration: Number,
			description: String,
		},
	],
	count: Number,
})

const User = mongoose.model('User', userSchema)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
})

app
	.route('/api/users')
	.post((req, res) => {
		const username = req.body.username
		const user = new User({ username, count: 0 })
		user.save((err, data) => {
			if (err) {
				res.json({ error: err })
			}
			res.json(data)
		})
	})
	.get((req, res) => {
		User.find((err, data) => {
			if (data) {
				res.json(data)
			}
		})
	})

app.post('/api/users/:_id/exercises', (req, res) => {
	const { description } = req.body
	const duration = parseInt(req.body.duration)
	const date = req.body.date
		? new Date(req.body.date).toDateString()
		: new Date().toDateString()
	const id = req.params._id

	const exercise = {
		date,
		duration,
		description,
	}

	User.findByIdAndUpdate(
		id,
		{
			$push: { log: exercise },
			$inc: { count: 1 },
		},
		{ new: true },
		(err, user) => {
			if (user) {
				const updatedExercise = {
					_id: id,
					username: user.username,
					...exercise,
				}
				// console.log(updatedExercise)
				res.json(updatedExercise)
			}
		}
	)
})

app.get('/api/users/:_id/logs', (req, res) => {
	const { from, to, limit } = req.query

	User.findById(req.params._id, (err, user) => {
		if (user) {
			if (from || to || limit) {
				const logs = user.log
				console.log('logs')
				const filteredLogs = logs.filter((log) => {
					const formattedLogDate = new Date(log.date)
						.toISOString()
						.split('T')[0]
					console.log(formattedLogDate)
					return true
				})

				console.log(filteredLogs)
				const slicedLogs = limit ? filteredLogs.slice(0, limit) : filteredLogs
				user.log = slicedLogs
				console.log(slicedLogs)
			}

			res.json(user)
		}
	})
})

const listener = app.listen(process.env.PORT, () => {
	console.log('Your app is listening on port ' + listener.address().port)
})
