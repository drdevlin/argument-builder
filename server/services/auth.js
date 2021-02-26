const uuid = require('uuid').v4;
const db = require('../../db/db.js');
const encrypted = require('../../services/encrypted.js');

const createNewUser = (req, res, next) => {
  const password = req.body.password;
  encrypted(password).forStorage
    .then(encryptedPassword => {
      req.body.password = encryptedPassword;
      req.body.id = uuid();
      return db.create('users', req.body);
    })
    .then(userCreated => {
      req.body.password = password;
      next();
    })
    .catch(rejection => {
      res.status(500);
      res.send(rejection);
  });
}

const startSession = (req, res, next) => {
  const session_id = uuid();
  db.create('sessions', { id: session_id })
    .then(sessionCreated => db.update('users', { id: req.user.id }, { session_id }))
    .then(userUpdated => {
      req.user.session_id = session_id;
      req.payload = req.user;
      res.status(201);
      next();
    })
    .catch(rejection => {
      req.payload = rejection;
      res.status(500);
      next();
  });
}

module.exports = { createNewUser, startSession };