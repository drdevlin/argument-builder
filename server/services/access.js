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
  const rowIdentifier = { ...req.query };
  if (rowIdentifier.hasOwnProperty('s')) delete rowIdentifier.s;
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
      if (rejection.message === 'Not found') {
        res.status(404);
      } else {
        res.status(500);
      }
      next();
  });
};

exports.updateElements = (req, res, next) => {
  const table = req.params.table;
  const rowIdentifier = { ...req.query };
  if (rowIdentifier.hasOwnProperty('s')) delete rowIdentifier.s;
  const data = req.body.data;
  db.update(table, rowIdentifier, data)
    .then(resolution => {
      if (!resolution.rowCount) throw new Error('Not found');
      req.payload = resolution;
      res.status(201);
      next();
    })
    .catch(rejection => {
      req.payload = rejection;
      if (rejection.message === 'Not found') {
        res.status(404);
      } else {
        res.status(500);
      }
      next();
  });
};

exports.deleteElements = (req, res, next) => {
  const table = req.params.table;
  const rowIdentifier = { ...req.query };
  if (rowIdentifier.hasOwnProperty('s')) delete rowIdentifier.s;
  db.del(table, rowIdentifier)
    .then(resolution => {
      if (!resolution.rowCount) throw new Error('Not found');
      req.payload = resolution;
      res.status(201);
      next();
    })
    .catch(rejection => {
      req.payload = rejection;
      if (rejection.message === 'Not found') {
        res.status(404);
      } else {
        res.status(500);
      }
      next();
  });
};