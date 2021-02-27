const db = require('../../db/db.js')

exports.sendResponse = (req, res) => {
  const payload = req.payload || null;
  res.send(payload);
}

exports.authorize = (req, res, next) => {
  if (!req.params.user || !(req.body.session_id || req.query.s)) {
    res.status(401);
    res.send();
  }
  const session_id = (req.body.session_id) ? req.body.session_id : req.query.s;
  db.read('users', { id: req.params.user })
    .then(result => {
      const user = result.rows[0];
      if (user.session_id === session_id) {
        next();
      } else {
        res.status(401);
        res.send();
      }
    })
    .catch(rejection => {
      res.status(500);
      res.send(rejection);
  });
}