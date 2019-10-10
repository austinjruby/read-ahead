const queryController = {};

const Sequelize = require('sequelize');

const { User, Book, UserBook } = require('../models/database.js');

const sequelize = new Sequelize('multiuserreadinglist', 'postgres', 'jared', {
  host: 'localhost',
  dialect: 'postgres',
});

// add a book to d-base
queryController.addBook = (req, res, next) => {
  console.log(req.body)
  res.locals.id = req.body.userId
  Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  }).then((newBook) => {
    console.log(`new book created with id ${newBook.id}`);
    return next();
  }).catch(err => console.log(`Book create error: ${err}`));
};

// get all books from d-base
queryController.getAllBooks = (req, res, next) => {
  const userId = req.params.id || res.locals.id;
  console.log('getting all books')
  console.log(userId)
  Book.findAll({
    attributes: ['id', 'title', 'author', 'genre'],
    include: [{
      model: User,
      through: {
        where: {userId: userId}
      }
    }],
  }).then(books => JSON.stringify(books))
    .then((booksArr) => {
      console.log('these are your books', booksArr)
      res.status(200).send(booksArr);
      res.end();
    })
    .catch(err => next({message: {err: err}}));
};
// queryController.getAllBooks = (req, res, next) => {
//   console.log('getting all books')
//   Book.findAll({
//     attributes: ['id', 'title', 'author', 'genre'],
//   }).then(books => JSON.stringify(books))
//     .then((booksArr) => {
//       console.log('these are your books', booksArr)
//       res.status(200).send(booksArr);
//       res.end();
//     })
//     .catch(err => next({message: {err: err}}));
// };

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
  UserBook.destroy({
    where: {
      user_id: req.body.userId,
      book_id: req.body.bookId
    }
  }).then(() => {
    console.log(`book ${req.body.bookId} deleted`);
    return next();
  })
    .catch(err => next({message: {err: err}}));
};

module.exports = queryController;
