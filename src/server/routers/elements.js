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
} = require('../services/elements.js');


// C
router.post('/:table', createElements, sendResponse);

// R
router.get('/:table', readElements, sendResponse);

// U
router.put('/:table', updateElements, sendResponse);

// D
router.delete('/:table', deleteElements, sendResponse);

module.exports = router;