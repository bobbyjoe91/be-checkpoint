const express = require('express');

const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.index);
router.get('/attendances/:employeeId', indexController.getAttendancesById);
router.post('/clock', indexController.setClockStatus);
router.get('/employee/:employeeId', indexController.getEmployeeById);

module.exports = router;
