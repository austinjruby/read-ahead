const authController = {};

const Sequelize = require('sequelize');

const { User } = require('../models/database.js');

const sequelize = new Sequelize('multiuserreadinglist', 'postgres', 'jared', {
  host: 'localhost',
  dialect: 'postgres',
});

authController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ 
    attributes: ['id', 'username', 'password'],
    where: { username: username } 
  })
    // .then((response => JSON.stringify(response)))
    .then(user => {
      user.password === password ? 
        res.status(200).send({status: 'success'}) :
        res.status(200).send({status: 'failed'})
    })
    .catch(err => {
      next({ message: { err: `user not found: ${err}` }})
      res.send({status: 'failed'})
    })
}

module.exports = authController;
