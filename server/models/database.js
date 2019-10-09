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

User.sync({force: true}).then(() => {
  return User.create({
    firstName: 'Roger',
    lastName: 'Rabbit',
    username: 'rrabbit',
    password: 'carrots12'
  })
})

User.associate = function(models) {
  User.belongsToMany(models.Book, {
    through: 'UserBooks',
    as: 'users',
    foreignKey: 'userId',
    otherKey: 'bookId'
  })
}

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

Book.sync({force: true}).then(() => {
  return Book.create({
    title: 'Post Office',
    author: 'Charles Bukowski',
  })
})

Book.associate = function(models) {
  Book.belongsToMany(models.User, {
    through: 'UserBooks',
    as: 'books',
    foreignKey: 'bookId',
    otherKey: 'userId'
  })
}

// define UserBook model
const UserBook = sequelize.define('userbook', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bookId: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'userbook',
});

UserBook.sync({force: true}).then(() => {
  console.log('great success')
  return UserBook.create({
    userId: 1,
    bookId: 1
  })
}).catch(err => console.log(err))

// module.exports = { User, Book, UserBook};
