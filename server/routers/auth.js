const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import generic services
const { sendResponse } = require('../services/generic.js');

// Import router's services
const { createNewUser, startSession } = require('../services/auth.js');


router.post('/login', passport.authenticate('local'), startSession, sendResponse);

router.post('/signup', createNewUser, passport.authenticate('local'), startSession, sendResponse);

module.exports = router;

