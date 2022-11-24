CREATE TABLE Attendance (
  attendance_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  employee_id INT DEFAULT NULL,
  date DATE NOT NULL,
  time_in TIME NOT NULL,
  time_out TIME DEFAULT NULL
);