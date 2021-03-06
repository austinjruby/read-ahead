const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
const authController = require('./controllers/authControllers.js');
const queryController = require('./controllers/queryControllers.js');

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// authenticate user trying to log in (in d-base)
app.post('/auth', authController.verifyUser);

// get all books from d-base
app.get('/api/:id', queryController.getAllBooks);

// add book to d-base
app.post('/api',
  queryController.addBook,
  queryController.getAllBooks);

// update read column for user_book row in d-base
app.patch('/api',
  queryController.toggleRead,
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

app.all('*', (req, res) => res.status(404).send('path not found'));

app.use((err, req, res, next) => {
  console.log('err:', err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
