CREATE TABLE Positions (
  position_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  position_name VARCHAR(20) NOT NULL
);

INSERT INTO Positions (position_name)
VALUES
  ('Director'),
  ('Vice President'),
  ('Manager'),
  ('Assistant Manager'),
  ('Section Head'),
  ('Staff');