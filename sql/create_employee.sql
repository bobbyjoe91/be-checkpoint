CREATE TABLE Employee (
  employee_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  position_id INT,
  division_id INT,
  attendance_id INT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  photo_url VARCHAR(2083),
  password CHAR(128) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (position_id) REFERENCES Positions(position_id),
  FOREIGN KEY (division_id) REFERENCES Division(division_id),
  FOREIGN KEY (attendance_id) REFERENCES Attendance(attendance_id) ON DELETE SET NULL
);

ALTER TABLE Attendance ADD
CONSTRAINT fk_employee_id
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id);