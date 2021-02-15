const db = require('../../db/db.js');

const createNewUser = (req, res, next) => {
  db.create('users', req.body)
    .then(resolution => {
      req.payload = resolution;
      res.status(201);
      next();
    })
    .catch(rejection => {
      req.payload = rejection;
      res.status(500);
      next();
  });
}

module.exports = { createNewUser };