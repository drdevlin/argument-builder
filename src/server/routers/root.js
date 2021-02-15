const express = require('express');
const router = express.Router();

// Mount routers
const auth = require('./auth.js');
const access = require('./access.js');

router.use('/auth', auth);
router.use('/access', access);

module.exports = router;
