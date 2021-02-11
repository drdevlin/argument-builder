const db = require('../../db/db.js');

const createNewUser = (req, res, next) => {
  db.create('users', req.body)
    .then(resolution => {
      req.payload = req.body[0].email;
      res.status(201);
      next();
    })
    .catch(rejection => {
      req.payload = rejection.detail;
      res.status(500);
      next();
  });
}

module.exports = { createNewUser };