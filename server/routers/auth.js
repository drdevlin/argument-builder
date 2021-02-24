const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import generic services
const { sendResponse } = require('../services/generic.js');

// Import router's services
const { createNewUser, startSession } = require('../services/auth.js');

// C
router.post('/', passport.authenticate('local'), (req, res, next) => {
  req.payload = req.user;
  next();
}, sendResponse);

router.post('/login', passport.authenticate('local'), startSession, sendResponse);

router.post('/signup', createNewUser, sendResponse);

// R

// U

// D

module.exports = router;

