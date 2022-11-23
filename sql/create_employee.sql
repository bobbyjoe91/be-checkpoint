CREATE TABLE Employee (
  employee_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  password CHAR(128) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  position_id INT,
  division_id INT,
  attendance_id INT,
  FOREIGN KEY (position_id) REFERENCES Positions(position_id),
  FOREIGN KEY (division_id) REFERENCES Division(division_id),
  FOREIGN KEY (attendance_id) REFERENCES Attendance(attendance_id)
);