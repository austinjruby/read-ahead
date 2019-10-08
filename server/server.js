const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
const queryController = require('./controllers/queryControllers.js');

// body parser
app.use(bodyParser.json());

// get all books from d-base
app.get('/api', queryController.getAllBooks);

// add book to d-base
app.post('/api',
  queryController.addBook,
  queryController.getAllBooks);

// update book in d-base
app.patch('/api/:bookId',
  queryController.updateBook,
  queryController.getAllBooks);

// delete book from d-base
app.delete('/api/:bookId',
  queryController.deleteBook,
  queryController.getAllBooks);

// serve static content from client folder
app.use(express.static(path.resolve(__dirname, '/build')));

// // serve compiled bundle file in webpack production mode
// app.get('/build/bundle.js', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../build/bundle.js'));
// });

// serve html file
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../client/src/index.html'));
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
