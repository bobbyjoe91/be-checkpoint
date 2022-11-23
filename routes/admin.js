const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/', adminController.index);
router.get('/attendances', adminController.getAllAttendances);

module.exports = router;
