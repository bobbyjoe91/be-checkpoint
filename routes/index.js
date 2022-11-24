const express = require('express');

const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.index);
router.get('/attendances/:employeeId', indexController.getAttendancesById);
router.get('/employee/:employeeId', indexController.getEmployeeById);

module.exports = router;
