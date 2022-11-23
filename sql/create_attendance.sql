CREATE TABLE Attendance (
  attendance_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  date DATE NOT NULL,
  time_in TIME NOT NULL,
  time_out TIME NOT NULL
);