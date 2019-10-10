const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
const authController = require('./controllers/authControllers.js');
const queryController = require('./controllers/queryControllers.js');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// authenticate user trying to log in (in d-base)
app.post('/auth', authController.verifyUser)

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
app.delete('/api/',
  queryController.deleteBook,
  queryController.getAllBooks);

// serve static content from build folder
app.use('/build', express.static(path.resolve(__dirname, '../build')));

// serve html file
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// TODO: delete this and actually do authentication
app.get('/fart', (req, res, next) => {
  res.end('NICE!')
})

app.all('*', (req, res) => res.status(404).send('path not found'))

app.use((err, req, res, next) => {
  console.log("err:", err)
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
