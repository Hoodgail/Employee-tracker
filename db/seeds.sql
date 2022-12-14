INSERT INTO departments (department_name)
VALUES
('Accounting'),
('Marketing'),
('Sales'),
('Legal'),
('Human Resources'),
('Engineering'),
('Finance'),
('Production'),
('Quality Management'),
('Research'),
('Development'),
('Public Relations'),
('Sales'),
('Executive'),
('Shipping'),
('IT'),
('Maintenance'),
('Admin');

INSERT INTO roles (title, salary, department_id)
VALUES
('Accountant', 50000, 1),
('Marketing Manager', 56000, 2),
('Sales Manager', 60000, 3),
('Legal Team Lead', 70000, 4),
('HR Manager', 60000, 5),
('Engineering Manager', 60000, 6),
('Finance Manager', 60000, 7),
('Production Manager', 60000, 8),
('Quality Manager', 60000, 9),
('Research Manager', 60000, 10),
('Development Manager', 60000, 11),
('Public Relations Manager', 60000, 12),
('Sales Manager', 60000, 13),
('Executive Manager', 60000, 14),
('Shipping Manager', 60000, 15),
('IT Manager', 60000, 16),
('Maintenance Manager', 60000, 17),
('Admin Manager', 60000, 18);

INSERT INTO employees (firstName, lastName, rolesID, managerID)
VALUES
('John', 'Doe', 1, 1),
('Jane', 'Doe', 2, 2),
('John', 'Smith', 3, 3),
('Jane', 'Smith', 4, 4),
('John', 'Doe', 5, 5),
('Jane', 'Doe', 6, 6),
('John', 'Smith', 7, 7),
('Jane', 'Smith', 8, 8),
('John', 'Doe', 9, 9),
('Jane', 'Doe', 10, 10),
('John', 'Smith', 11, 11),
('Jane', 'Smith', 12, 12),
('John', 'Doe', 13, 13),
('Jane', 'Doe', 14, 14),
('John', 'Smith', 15, 15),
('Jane', 'Smith', 16, 16),
('John', 'Doe', 17, 17),
('Jane', 'Doe', 18, 18);