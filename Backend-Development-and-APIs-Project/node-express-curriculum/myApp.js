require('dotenv').config()
let bodyParser = require('body-parser')

var express = require('express');
var app = express();

console.log('Hello World')

app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

/*
app.get('/', (req, res) => {
  res.send('Hello Express')
})
*/

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.use('/public', express.static(__dirname + '/public'))

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({
      'message': 'HELLO JSON'
    })
  } else {
    res.json({
      'message': 'Hello json'
    })
  }
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({
    'time': req.time
  })
})

app.get('/:word/echo', (req, res) => {
  res.json({
    echo: req.params.word
  })
})

app.get('/name', (req, res) => {
  let string = `${req.query.first} ${req.query.last}`
  res.json({
    name: string
  })
})

app.post(
  '/name',
  (req, res) => {
    let string = `${req.body.first} ${req.body.last}`
    res.json({
      name: string
    })
  }
)















 module.exports = app;
