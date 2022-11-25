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
        data: 'Email atau password salah',
      });

      return;
    }

    const hashedPassword = result[0].password;

    const isMatch = validate(password, hashedPassword);
    if (isMatch) {
      // get user data
      const userData = await executeQuery(
        checkPointDB,
        `
          SELECT
            E.employee_id, E.name, E.position_id, E.division_id, E.phone_number, E.photo_url,
            P.position_name, D.division_name, E.attendance_id
          FROM
            (SELECT * FROM Employee WHERE email = ?) AS E
            INNER JOIN Positions P ON E.position_id = P.position_id
            INNER JOIN Division D ON E.division_id = D.division_id
        `,
        [email]
      );

      res.status(200).json({
        message: 'success',
        data: userData[0],
      });
    } else {
      res.status(403).json({
        message: 'error',
        data: 'Email atau password salah',
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
