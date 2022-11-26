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
          A.attendance_id, E.employee_id,
          E.name, E.email,
          DATE_FORMAT(A.date, '%Y-%m-%d') as date,
          A.time_in, A.time_out
        FROM Attendance A
        INNER JOIN Employee E ON A.employee_id = E.employee_id
        ORDER BY A.attendance_id DESC;
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

async function editEmployee(req, res) {
  try {
    const { employeeId } = req.params;
    const { name, email, phoneNumber, photoUrl, positionId, divisionId } = req.body;

    await executeQuery(
      checkPointDB,
      `
        UPDATE Employee
        SET name = ?, email = ?, phone_number = ?, photo_url = ?, position_id = ?, division_id = ?
        WHERE employee_id = ?
      `,
      [name, email, phoneNumber, photoUrl, positionId, divisionId, employeeId]
    );

    res.status(200).json({
      message: 'success',
      data: `Employee #${employeeId} has been edited`,
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
  editEmployee,
  getAllAttendances,
};
