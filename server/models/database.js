const Sequelize = require('sequelize');

const sequelize = new Sequelize('readinglist', 'postgres', 'jared', {
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

// User.sync().then(() => {
//   return User.create({
//     firstName: 'Roger',
//     lastName: 'Rabbit',
//     username: 'rrabbit',
//     password: 'carrots12'
//   })
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

// Book.sync().then(() => {
//   return Book.create({
//     title: 'Post Office',
//     author: 'Charles Bukowski',
//   })
// })

module.exports = { User, Book };
