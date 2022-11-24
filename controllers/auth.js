const { checkPointDB, executeQuery } = require('../utils/db');
const { encodePassword } = require('../utils/hash');

function index(req, res) {
  res.status(200).json({
    message: '[BE] CheckPoint'
  });
}

function login(req, res) {

}

async function register(req, res) {
  // TODO: enable user to upload image
  try {
    const { name, email, password, phoneNumber, photoUrl, positionId, divisionId } = req.body;
    const encoded = encodePassword(password);
    const sqlData = {
      name,
      email,
      password: encoded,
      phone_number: phoneNumber,
      photo_url: photoUrl,
      position_id: positionId,
      division_id: divisionId,
    };

    await executeQuery(checkPointDB, `INSERT INTO Employee SET ?`, sqlData);

    res.status(200).json({
      message: 'success',
      data: 'Log in success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      data: error.toString(),
    });
  }
}

function resetPassword(req, res) {
  
}

module.exports = {
  index,
  login,
  register,
  resetPassword,
};
