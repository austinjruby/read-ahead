const {Pool} = require('pg');
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'multiuserreadinglist',
  password: 'jared',
  port: 5432,
})

const queryController = {};



// add a book to d-base
queryController.addBook = (req, res, next) => {
  const { userId, title, author, genre} = req.body;
  res.locals.id = userId;
  console.log('res.locals.id', res.locals.id);
  pool.query('INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *',
    [title, author, genre],
    (error, result) => {
      if (error) return next({message: {err: error}});
      console.log(`added book ${JSON.stringify(result.rows[0])}`);
      const bookId = result.rows[0].id;
      pool.query('INSERT INTO user_books (user_id, book_id) VALUES ($1, $2)',
        [res.locals.id, bookId],
        (error, result) => {
          if (error) return next({message: {err: error}});
          console.log('user_book row created');
          return next();
        }
      )
    }  
  )
};

// get all books from d-base
queryController.getAllBooks = (req, res, next) => {
  const userId = req.params.id || res.locals.id
  console.log('getting all books for user:', userId)
  pool.query(`SELECT * FROM books JOIN user_books ON user_books.book_id = books.id WHERE user_books.user_id = ${userId}`, 
    (error, results) => {
      if (error) return next({message: {err: error}});
      res.status(200).json(results.rows)
    }
  )
};

// flip boolean of read column in user_books
queryController.toggleRead = (req, res, next) => {
  console.log(req.body)
  const {userId, bookId} = req.body;
  res.locals.id = userId;
  pool.query(`UPDATE user_books SET read = NOT read WHERE user_id=${userId} AND book_id=${bookId}`,
  (error, result) => {
    if (error) return next({message: {err: error}});
    console.log(`updated read`)
    return next();
  }
  )
}

// remove a book from the d-base
queryController.deleteBook = (req, res, next) => {
  console.log(req.body)
  const {userId, bookId} = req.body;
  console.log('user', userId, 'book', bookId)
  res.locals.id = userId;
  pool.query(`DELETE FROM user_books WHERE user_id=${userId} AND book_id=${bookId} RETURNING *`,
    (error, result) => {
      if (error) return next({message: {err: error}});
      console.log(`user_book deleted: ${JSON.stringify(result.rows[0])}`)
      return next();
    }
  )
};

module.exports = queryController;
