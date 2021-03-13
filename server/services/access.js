const db = require('../../db/db.js');

exports.createElements = (req, res, next) => {
  const table = req.params.table;
  const rows = req.body.rows;
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

exports.readElements = (req, res, next) => {
  const table = req.params.table;
  const rowIdentifier = req.query;
  db.read(table, rowIdentifier)
    .then(result => {
      if (!result.rowCount) throw new Error('Not found');
      if (result.rowCount === 1) {
        req.payload = result.rows[0];
      } else {
        req.payload = result.rows;
      }
      res.status(201);
      next();
    })
    .catch(rejection => {
      req.payload = rejection;
      res.status(500);
      next();
  });
};

exports.updateElements = (req, res, next) => {
  const table = req.params.table;
  const rowIdentifier = req.query;
  const data = req.body.data;
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

exports.deleteElements = (req, res, next) => {
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