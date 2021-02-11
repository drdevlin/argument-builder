const express = require('express');
const router = express.Router();

// Import generic services
const { sendResponse } = require('../services/generic.js');

// Import router's services
const { createNewUser } = require('../services/users.js');

// C
router.post('/', createNewUser, sendResponse);

// R

// U

// D

module.exports = router;

