const express = require('express');
const router = express.Router();

// Mount routers
const users = require('./users.js');

router.use('/users', users);

module.exports = router;
