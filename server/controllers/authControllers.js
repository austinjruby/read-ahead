const {Pool} = require('pg');
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'multiuserreadinglist',
  password: 'jared',
  port: 5432,
})

const authController = {};

authController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  pool.query(`SELECT id, username, password FROM users WHERE username='${username}'`,
    (error, result) => {
      if (error) {
        next({ message: { err: `user not found: ${error}` }})
        res.send({status: 'failed'})
        res.end()
      }
      result.rows[0].password === password ?
      res.status(200).send({userId: result.rows[0].id, status: 'success'}) :
      res.status(200).send({status: 'failed'})
    }
  )
}

module.exports = authController;
