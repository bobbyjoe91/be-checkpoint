const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const { isAdmin } = require('../middlewares');

router.get('/', authController.index);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/admin/login', isAdmin, authController.login);
router.put('/reset-password', authController.resetPassword);

module.exports = router;
