const express = require('express');
const { submitContactForm } = require('../controllers/contact.controller');

const router = express.Router();

// POST route for form submission
router.post('/', submitContactForm);

module.exports = router;
