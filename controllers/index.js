const path = require('path');
const dayjs = require('dayjs');

const { checkPointDB, executeQuery } = require('../utils/db');
const { encodePassword } = require('../utils/hash');

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
      SELECT
        A.attendance_id,
        DATE_FORMAT(A.date, '%Y-%m-%d') as date,
        A.time_in, A.time_out
      FROM Attendance A
      WHERE A.employee_id = ?
    `;

    // filter by start and end date if both exist
    if (req.query.start_date && req.query.end_date) {
      sqlCommand += ' AND date >= ? AND date <= ? ORDER BY A.attendance_id DESC;';
      args.push(req.query.start_date, req.query.end_date);
    } else if (req.query.start_date) {
      sqlCommand += ' AND date >= ? ORDER BY A.attendance_id DESC;';
      args.push(req.query.start_date);
    } else if (req.query.end_date) {
      sqlCommand += ' AND date <= ? ORDER BY A.attendance_id DESC;';
      args.push(req.query.end_date);
    } else {
      sqlCommand += ' AND MONTH(date) = MONTH(CURRENT_DATE()) AND YEAR(date) = YEAR(CURRENT_DATE()) ORDER BY A.attendance_id DESC;';
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
        E.employee_id, E.name, E.email, E.phone_number, E.photo_url,
        P.position_name, P.position_id, D.division_name, D.division_id,
        E.attendance_id
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

async function setClockStatus(req, res) {
  try {
    const { employeeId, attendanceId } = req.body;
    const { status } = req.query;

    const timeStamp = dayjs();

    if (status === 'in' && employeeId) {
      const currentDate = timeStamp.format('YYYY-MM-DD');
      const timeIn = timeStamp.format('HH:mm:ss');

      const clockInResponse = await executeQuery(
        checkPointDB,
        `INSERT INTO Attendance (date, time_in, employee_id) VALUES (?, ?, ?)`,
        [currentDate, timeIn, employeeId]
      );

      // update employee's attendance ID
      await executeQuery(
        checkPointDB,
        `UPDATE Employee SET attendance_id = ? WHERE employee_id = ?`,
        [clockInResponse.insertId, employeeId]
      );

      res.status(200).json({
        message: 'success',
        data: {
          attendanceId: clockInResponse.insertId
        },
      });
    } else if (status === 'out' && attendanceId && employeeId) {
      const timeOut = timeStamp.format('HH:mm:ss');

      await executeQuery(
        checkPointDB,
        `UPDATE Attendance SET time_out = ? WHERE attendance_id = ?`,
        [timeOut, attendanceId]
      );

      // revoke employee's attendance ID
      await executeQuery(
        checkPointDB,
        `UPDATE Employee SET attendance_id = NULL WHERE employee_id = ?`,
        [employeeId]
      );

      res.status(200).json({
        message: 'success',
        data: { attendanceId: null },
      });
    } else {
      res.status(500).json({
        message: 'error',
        data: 'Invalid clock status',
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
  try {
    const { file, body } = req;
    let newEmployee = {
      name: body.name,
      email: body.email,
      phone_number: body.phoneNumber,
      position_id: body.positionId,
      division_id: body.divisionId,
      password: encodePassword(body.password),
      photo_url: file ? `http://localhost:8000/${file.path}` : null,
    };

    await executeQuery( checkPointDB, `INSERT INTO Employee SET ?`, newEmployee);

    res.status(200).json({
      message: 'success',
      data: 'Register success',
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
    const { file, body, params } = req;
    const photoUrl = file ? `http://localhost:8000/${file.path}` : null
    let sqlQuery = `UPDATE Employee SET phone_number = ?`;
    let args = [body.phoneNumber]

    if (photoUrl) {
      sqlQuery += ', photo_url = ?'
      args.push(photoUrl);
    }

    await executeQuery(
      checkPointDB,
      sqlQuery + ' WHERE employee_id = ?',
      [...args, params.employee_id]
    );

    res.status(200).json({
      message: 'success',
      data: 'Edit success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      data: error.toString(),
    });
  }
}

module.exports = {
  editEmployee,
  index,
  getAttendancesById,
  getEmployeeById,
  register,
  setClockStatus,
};
