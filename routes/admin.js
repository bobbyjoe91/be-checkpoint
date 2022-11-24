const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/', adminController.index);
router.get('/attendances', adminController.getAllAttendances);
router.put('/employee/edit/:employeeId', adminController.editEmployee);

module.exports = router;
