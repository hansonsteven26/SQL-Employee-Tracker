INSERT INTO department (name)
VALUES ("Shipping & Packaging"),
("Assembly"),
("Production"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Packaging Operator", 50000, 1),
("Assembler", 65000, 2),
("Production Team Member", 75000, 3),
("Sales Representative", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Breann", "Mandela", 1, NULL),
("Taylen", "Jaufenheimer", 3, NULL),
("Jonathan", "Banks", 1, 1),
("James", "Michelson", 2, 2),
("Sarah", "Donnogee", 3, 2),
("Jaytham", "Tason", 4, 1),
("Brock", "Botkinson", 1, 1),
("Stoodge", "Wilkins", 2, 2),
("Maison", "Gladkins", 3, 2);