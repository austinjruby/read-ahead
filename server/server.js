const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '/client')))

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/bundle.js'))
})

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../client/src/index.html'))
})

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});
