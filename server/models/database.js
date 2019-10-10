const Sequelize = require('sequelize');

const sequelize = new Sequelize('multiuserreadinglist', 'postgres', 'jared', {
  host: 'localhost',
  dialect: 'postgres',
});

// const {Model} = Sequelize;

// // test db connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// define User model
const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
});

// User.sync({force: true}).then(() => {
//   return User.bulkCreate([
//     {
//       firstName: 'Roger',
//       lastName: 'Rabbit',
//       username: 'rrabit',
//       password: 'carrots12'
//     },
//     {
//       firstName: 'Sally',
//       lastName: 'Smith',
//       username: 'ssmith',
//       password: 'sally12'
//     },
//   ])
// })

// define Books model
const Book = sequelize.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  hasRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'book',
});

// Book.sync({force: true}).then(() => {
//   return Book.bulkCreate([
//     {
//       title: 'Post Office',
//       author: 'Charles Bukowski',
//     },
//     {
//       title: 'Pinball',
//       author: 'Jerzy Kosinski',
//     },
//     {
//       title: 'The Maltese Falcon',
//       author: 'Dashiell Hammett',
//     },
//   ])
// })

// // define UserBook model
// const UserBook = sequelize.define('userbook', {
//   user_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   book_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'userbook',
// });

// UserBook.sync({force: true}).then(() => {
//   console.log('great success')
//   return UserBook.bulkCreate([
//     {
//       user_id: 1,
//       book_id: 1
//     },
//     {
//       user_id: 1,
//       book_id: 2
//     },
//     {
//       user_id: 1,
//       book_id: 3
//     },
//     {
//       user_id: 2,
//       book_id: 1
//     },
//   ])
// }).catch(err => console.log(err))

// link User and Book models
User.belongsToMany(Book, {
  through: 'UserBook',
  // as: 'users',
  // foreignKey: 'user_id',
  // otherKey: 'book_id'
})

Book.belongsToMany(User, {
  through: 'UserBook',
  // as: 'books',
  // foreignKey: 'book_id',
  // otherKey: 'user_id'
})

sequelize.sync();

module.exports = { User, Book }