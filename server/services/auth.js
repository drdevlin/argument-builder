const uuid = require('uuid').v4;
const db = require('../../db/db.js');

const createNewUser = (req, res, next) => {
  db.create('users', [req.body])
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

const startSession = (req, res, next) => {
  const session_id = uuid();
  db.create('sessions', [{ id: session_id }])
    .then(sessionCreated => {
      db.update('users', { id: req.user.id }, { session_id })
        .then(userUpdated => {
          req.user.session_id = session_id;
          req.payload = req.user;
          res.status(201);
          next();
        })
    })
    .catch(rejection => {
      req.payload = rejection;
      res.status(500);
      next();
  });
}

module.exports = { createNewUser, startSession };