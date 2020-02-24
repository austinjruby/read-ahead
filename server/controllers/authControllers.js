const { query } = require('../models/database');

const authController = {};

authController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  query(`SELECT id, username, password FROM users WHERE username='${username}'`,
    (error, result) => {
      if (error) {
        return next({ message: { err: `user not found: ${error}` } });
      }
      result.rows[0].password === password
        ? res.status(200).send({ userId: result.rows[0].id, status: 'success' })
        : res.status(200).send({ status: 'failed' });
    });
};

module.exports = authController;
