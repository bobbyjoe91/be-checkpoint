const { checkPointDB, executeQuery } = require('../utils/db');

function index(req, res) {
  res.status(200).json({
    message: '[BE] CheckPoint'
  });
}

async function getAttendancesById(req, res) {
  try {
    const { employeeId } = req.params;
    const args = [employeeId];
    let sqlCommand = `
      SELECT A.attendance_id, A.date, A.time_in, A.time_out
      FROM Attendance A
      WHERE A.employee_id = ?
    `;

    // filter by start and end date if both exist
    if (req.query.start_date && req.query.end_date) {
      sqlCommand += ' AND date >= ? AND date <= ?;';
      args.push(req.query.start_date, req.query.end_date);
    } else {
      sqlCommand += ' AND MONTH(date) = MONTH(CURRENT_DATE()) AND YEAR(date) = YEAR(CURRENT_DATE());';
    }

    const result = await executeQuery(checkPointDB, sqlCommand, args);

    res.status(200).json({
      message: 'success',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      data: error.toString(),
    });
  }
}

async function getEmployeeById(req, res) {
  try {
    const { employeeId } = req.params;
    const args = [employeeId];
    let sqlCommand = `
      SELECT
        E.employee_id, E.name, E.email, E.phone_number, E.photo_url, P.position_name, D.division_name
      FROM
        (SELECT * FROM Employee WHERE employee_id = ?) AS E
        INNER JOIN Positions P ON E.position_id = P.position_id
        INNER JOIN Division D ON E.division_id = D.division_id
    `;

    const result = await executeQuery(checkPointDB, sqlCommand, args);

    res.status(200).json({
      message: 'success',
      data: result,
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
  getAttendancesById,
  getEmployeeById,
};
