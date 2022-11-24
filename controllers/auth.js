const { checkPointDB, executeQuery } = require('../utils/db');
const { encodePassword, validate } = require('../utils/hash');

function index(req, res) {
  res.status(200).json({
    message: '[BE] CheckPoint'
  });
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await executeQuery(
      checkPointDB,
      `SELECT password FROM Employee WHERE email = ?`,
      [email]
    );

    if (result.length === 0) {
      res.status(500).json({
        message: 'error',
        data: 'Login failed. Please re-check your email or password',
      });

      return;
    }

    const hashedPassword = result[0].password;

    const isMatch = validate(password, hashedPassword);
    if (isMatch) {
      // TODO: send token to client
      res.status(200).json({
        message: 'success',
        data: 'Login success',
      });
    } else {
      res.status(500).json({
        message: 'error',
        data: 'Login failed. Please re-check your email or password',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'error',
      data: error.toString(),
    });
  }
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

async function resetPassword(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // get hashed pass
    const storedHash = await executeQuery(
      checkPointDB,
      `SELECT password FROM Employee WHERE email = ?`,
      [email]
    );

    if (storedHash.length === 0) {
      res.status(500).json({
        message: 'error',
        data: 'Employee does not exist',
      });

      return;
    }

    // validate old password
    const isOldMatch = validate(oldPassword, storedHash[0].password);

    // if matched, change password
    if (isOldMatch) {
      const newEncoded = encodePassword(newPassword);

      // update hash in DB
      await executeQuery(
        checkPointDB,
        `UPDATE Employee SET password = ? WHERE email = ?`,
        [newEncoded, email]
      );

      res.status(200).json({
        message: 'success',
        data: 'Password has been changed',
      });
    } else {
      res.status(500).json({
        message: 'error',
        data: 'Wrong password',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'error',
      data: error.toString(),
    });
  }
}

module.exports = {
  index,
  login,
  register,
  resetPassword,
};
