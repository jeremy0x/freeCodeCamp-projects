// server.js
// where your node app starts

// heroku self ping
require('heroku-self-ping').default('https://timestamp-jeremy.herokuapp.com/')

// init project
require('dotenv').config()

var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
const { response } = require('express')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port)
})

let responseObject = {}

app.get('/api/:input', (request, response) => {
	let input = request.params.input
	let integerRegEx = /^\d+$/

	if (input.includes('-')) {
		// input is an ISO date
		responseObject['unix'] = new Date(input).getTime()
		responseObject['utc'] = new Date(input).toUTCString()
	} else if (integerRegEx.test(input)) {
		// input is a timestamp
		input = parseInt(input)
		responseObject['unix'] = new Date(input).getTime()
		responseObject['utc'] = new Date(input).toUTCString()
	} else {
		responseObject['unix'] = new Date(input).getTime()
		responseObject['utc'] = new Date(input).toUTCString()
	}

	if (!responseObject['unix'] || !responseObject['utc']) {
		response.json({
			error: 'Invalid Date',
		})
	}

	response.json(responseObject)
})

app.get('/api', (request, response) => {
	responseObject['unix'] = new Date().getTime()
	responseObject['utc'] = new Date().toUTCString()

	response.json(responseObject)
})
