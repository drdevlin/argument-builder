const db = require('../../db/db.js');

const createElements = (req, res, next) => {
  const table = req.params.table;
  const rows = req.body;
  db.create(table, rows)
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
};

const readElements = (req, res, next) => {
  const table = req.params.table;
  const rowIdentifier = req.query;
  db.read(table, rowIdentifier)
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
};

const updateElements = (req, res, next) => {
  const table = req.params.table;
  const rowIdentifier = req.query;
  const data = req.body;
  db.update(table, rowIdentifier, data)
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
};

const deleteElements = (req, res, next) => {
  const table = req.params.table;
  const rowIdentifier = req.query;
  db.del(table, rowIdentifier)
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
};

module.exports = { 
  createElements,
  readElements,
  updateElements,
  deleteElements
};