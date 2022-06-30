require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const isUrl = require('is-url')

// Basic Configuration
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html')
})

let counter = 0
const shortEndUrls = {}

// Your first API endpoint
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' })
})

app.post('/api/shorturl', function (req, res) {
	const url = req.body.url
	// Check if url is valid
	if (!isUrl(url)) {
		res.json({ error: 'invalid url' })
		return
	}
	counter += 1
	shortEndUrls[counter] = url
	res.json({
		original_url: req.body.url,
		short_url: counter,
	})
})

app.get('/api/shorturl/:short_url', function (req, res) {
	const short_url = req.params.short_url
	const url = shortEndUrls[short_url]
	res.redirect(url)
})

app.listen(process.env.PORT || 3000, function () {
	console.log(`Listening on port ${process.env.PORT}`)
})
