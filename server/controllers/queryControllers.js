const queryController = {};

const Sequelize = require('sequelize');

const { User, Book } = require('../models/database.js');

const sequelize = new Sequelize('readinglist', 'postgres', 'jared', {
  host: 'localhost',
  dialect: 'postgres',
});

// add a book to d-base
queryController.addBook = (req, res, next) => {
  console.log(req.body)
  Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  }).then((newBook) => {
    console.log(`new book created with id ${newBook.id}`);
    return next();
  }).catch(err => console.log(err));
};

// get all books from d-base
queryController.getAllBooks = (req, res, next) => {
  console.log('getting all books')
  Book.findAll({
    attributes: ['id', 'title', 'author', 'genre'],
  }).then(books => JSON.stringify(books))
    .then((booksArr) => {
      console.log('these are your books', booksArr)
      res.status(200).send(booksArr);
      res.end();
    })
    .catch(err => console.log(err));
};

// update a book in the d-base
queryController.updateBook = (req, res, next) => {
  console.log('about to update this book', req.body);
  console.log('title', req.body.title)
  Book.update(
    { 
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre
    },
    { returning: true, where: { id: req.params.bookId } },
  ).then(([rowsUpdate, [updatedBook]]) => {
    // console.log(`successfully updated book with id ${[...updatedBook]}`);
    return next();
  }).catch(err=> console.log(err));
};

// remove a book from the d-base
queryController.deleteBook = (req, res, next) => {
  Book.destroy({
    where: {
      id: req.params.bookId,
    },
  }).then(() => {
    console.log(`book ${req.params.bookId} deleted`);
    return next();
  });
};

module.exports = queryController;
