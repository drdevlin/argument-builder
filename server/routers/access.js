const express = require('express');
const router = express.Router();

// Import generic services
const { sendResponse } = require('../services/generic.js');

// Import router's services
const { 
  createElements,
  readElements,
  updateElements,
  deleteElements
} = require('../services/access.js');


// C
router.post('/:user/:table', createElements, sendResponse);

// R
router.get('/:user/:table', readElements, sendResponse);

// U
router.put('/:user/:table', updateElements, sendResponse);

// D
router.delete('/:user/:table', deleteElements, sendResponse);

module.exports = router;