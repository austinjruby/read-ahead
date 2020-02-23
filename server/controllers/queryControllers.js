const fetch = require('node-fetch');
const { query } = require('../models/database');


const queryController = {};


// add a book to d-base
queryController.addBook = (req, res, next) => {
  console.log('api key', process.env.G_API_KEY);
  const { userId, title, author } = req.body;
  res.locals.id = userId;
  console.log('title', title, 'author', author);

  let wherePortion;
  if (title && author) wherePortion = `WHERE title='${title}' AND author='${author}'`;
  else if (title && !author) wherePortion = `WHERE title='${title}'`;
  else if (!title && author) wherePortion = `WHERE author='${author}'`;
  else res.send('must include search parameter');

  query(`SELECT * FROM books ${wherePortion}`)
    .then((result) => {
      const bookId = result.rows[0].id;
      query('INSERT INTO user_books (user_id, book_id) VALUES ($1, $2) ON CONFLICT (user_id, book_id) DO NOTHING',
        [res.locals.id, bookId],
        (error, result) => {
          if (error) return next({ message: { err: error } });
          console.log('user_book row created');
          return next();
        });
    })
    .catch((err) => {
      console.log('line 45', err);
      // account for null req params
      const titleParam = title
        ? `intitle:${title}`
        : '';
      const authorParam = author
        ? `inauthor:${author}`
        : '';

      const requestURL = `https://www.googleapis.com/books/v1/volumes?q=${titleParam}+${authorParam}&key=${process.env.G_API_KEY}`;

      fetch(requestURL)
        .then((response) => response.json())
        .then((result) => {
          console.log('it worked');
          const title = result.items[0].volumeInfo.title.toLowerCase();
          const author = result.items[0].volumeInfo.authors[0].toLowerCase();
          console.log('res.locals.id', res.locals.id);
          query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
            [title, author],
            (error, result) => {
              if (error) return next({ message: { err: error } });
              console.log(`added book ${JSON.stringify(result.rows[0])}`);
              const bookId = result.rows[0].id;
              query('INSERT INTO user_books (user_id, book_id) VALUES ($1, $2)',
                [res.locals.id, bookId],
                (error, result) => {
                  if (error) return next({ message: { err: error } });
                  console.log('user_book row created');
                  return next();
                });
            });
          // res.send({
          //   title: title,
          //   author: author
          // })
        })
        .catch((err) => console.log(err));
    });
};

// get all books from d-base
queryController.getAllBooks = (req, res, next) => {
  const userId = req.params.id || res.locals.id;
  console.log('getting all books for user:', userId);
  query(`SELECT id, title, author, read FROM books JOIN user_books ON user_books.book_id = books.id WHERE user_books.user_id = ${userId}`,
    (error, results) => {
      if (error) return next({ message: { err: error } });
      res.status(200).json(results.rows);
    });
};

// flip boolean of read column in user_books
queryController.toggleRead = (req, res, next) => {
  console.log(req.body);
  const { userId, bookId } = req.body;
  res.locals.id = userId;
  query(`UPDATE user_books SET read = NOT read WHERE user_id=${userId} AND book_id=${bookId}`,
    (error, result) => {
      if (error) return next({ message: { err: error } });
      console.log('updated read');
      return next();
    });
};

// remove a book from the d-base
queryController.deleteBook = (req, res, next) => {
  console.log(req.body);
  const { userId, bookId } = req.body;
  console.log('user', userId, 'book', bookId);
  res.locals.id = userId;
  query(`DELETE FROM user_books WHERE user_id=${userId} AND book_id=${bookId} RETURNING *`,
    (error, result) => {
      if (error) return next({ message: { err: error } });
      console.log(`user_book deleted: ${JSON.stringify(result.rows[0])}`);
      return next();
    });
};

module.exports = queryController;
