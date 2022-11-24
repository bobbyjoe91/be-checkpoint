const { checkPointDB, executeQuery } = require('../utils/db');

function index(req, res) {
  res.status(200).json({
    message: '[BE] CheckPoint'
  });
}

async function getAllAttendances(req, res) {
  try {
    const results = await executeQuery(
      checkPointDB,
      `
        SELECT
          A.attendance_id, E.employee_id, E.name, E.email, A.date, A.time_in, A.time_out
        FROM Attendance A
        INNER JOIN Employee E ON A.employee_id = E.employee_id;
      `
    );

    res.status(200).json({
      message: 'success',
      data: results
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      data: error.toString(),
    });
  }
}

module.exports = {
  index,
  getAllAttendances,
};
