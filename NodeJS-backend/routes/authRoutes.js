const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const regController = require('../controllers/regController'); 


router.post('/login', authController.login);
router.post('/register', regController.register);

module.exports = router;