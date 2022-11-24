const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/', authController.index);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/reset-password', authController.resetPassword);

module.exports = router;
