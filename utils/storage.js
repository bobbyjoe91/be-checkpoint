const fs = require('fs');
const multer = require('multer');

const profilePicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `./uploads`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(' ', '-'));
  }
});

module.exports = { profilePicStorage };
