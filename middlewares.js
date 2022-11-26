const { checkPointDB, executeQuery } = require('./utils/db');

async function isAdmin(req, res, next) {
  try {
    const { email } = req.body;
    const result = await executeQuery(
      checkPointDB,
      `SELECT division_id FROM Employee WHERE email = ?`,
      [email]
    );

    if (result[0].division_id !== 4) {
      res.status(500).json({
        message: 'error',
        data: 'Email atau password salah',
      });

      return;
    } else next();
  } catch (error) {
    res.status(500).json({
      message: 'error',
      data: error.toString(),
    });
  }
}

module.exports = {
  isAdmin
};
