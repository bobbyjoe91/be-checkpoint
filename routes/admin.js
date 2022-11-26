const express = require('express');
const multer = require('multer');

const { profilePicStorage } = require('../utils/storage');

const router = express.Router();
const photoUpload = multer({ storage: profilePicStorage });
const field = photoUpload.single('profilePic');

const adminController = require('../controllers/admin');

router.get('/', adminController.index);
router.get('/attendances', adminController.getAllAttendances);
router.put('/employee/edit/:employeeId', field, adminController.editEmployee);

module.exports = router;
