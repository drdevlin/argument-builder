const express = require('express');
const router = express.Router();

// Mount routers
const users = require('./users.js');
const elements = require('./elements.js');

router.use('/users', users);
router.use('/elements', elements);

module.exports = router;
