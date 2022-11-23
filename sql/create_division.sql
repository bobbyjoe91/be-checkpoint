CREATE TABLE Division (
  division_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  division_name VARCHAR(40) NOT NULL
);

INSERT INTO Division (division_name)
VALUES
  ('Marketing'),
  ('Sales'),
  ('IT'),
  ('Human Resource Development'),
  ('Finance');