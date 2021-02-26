const express = require('express');
const router = express.Router();

// Import generic services
const { sendResponse, authorize } = require('../services/generic.js');

// Import router's services
const { 
  createElements,
  readElements,
  updateElements,
  deleteElements
} = require('../services/access.js');


// C
router.post('/:user/:table', authorize, createElements, sendResponse);

// R
router.get('/:user/:table', authorize, readElements, sendResponse);

// U
router.put('/:user/:table', authorize, updateElements, sendResponse);

// D
router.delete('/:user/:table', authorize, deleteElements, sendResponse);

module.exports = router;