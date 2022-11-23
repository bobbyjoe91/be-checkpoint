CREATE TABLE Attendance (
  attendance_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  date DATE NOT NULL,
  time_in TIME NOT NULL,
  time_out TIME NOT NULL
);

ALTER TABLE Attendance ADD employee_id INT;

ALTER TABLE Attendance ADD
CONSTRAINT fk_employee_id
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id);