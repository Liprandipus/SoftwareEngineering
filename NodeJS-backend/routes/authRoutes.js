const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const regController = require('../controllers/regController');
const appointmentController = require('../controllers/appointmentController');

router.post('/login', authController.login);
router.post('/register', regController.register);
router.post('/appointment', appointmentController.bookAppointment);

module.exports = router;
