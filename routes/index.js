const express = require('express');
const multer = require('multer');

const { profilePicStorage } = require('../utils/storage');

const router = express.Router();
const photoUpload = multer({ storage: profilePicStorage });
const field = photoUpload.single('profilePic');

const indexController = require('../controllers/index');

router.get('/', indexController.index);
router.get('/attendances/:employeeId', indexController.getAttendancesById);
router.post('/clock', indexController.setClockStatus);
router.get('/employee/:employeeId', indexController.getEmployeeById);

router.post('/register', field, indexController.register);
router.post('/edit/:employee_id', field, indexController.editEmployee);

module.exports = router;
