const inquirer = require("inquirer");
const db = require("../connection/connection");

console.log();

// db.s

// // const db = mysql.createConnection({
// //     host: "localhost",
// //     user: "root",
// //     password: "Bootcamp",
// //     database: "employees",
// // });

const mainQuestions = [
    {
        type: "list",
        name: "answer",
        message: "SELECT an option... ",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "View all employees by manager",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee",
            "Exit",
        ],
    },
];

function getAllDepartments() {
    db.promise()
        .query("SELECT departments.id, departments.department_name FROM departments;")
        .then((departments) => {
            console.table(departments[0]);
            menuQuestion();
        });
}

function viewRoles() {
    db.promise()
        .query(
            "SELECT roles.id, roles.title, roles.salary, departments.department_name as department FROM roles LEFT JOIN departments on roles.department_id=departments.id;"
        )
        .then((roles) => {
            console.table(roles[0]);
            menuQuestion();
        });
}

function viewEmployees() {
    db.promise()
        .query(
            "SELECT employees.id, employees.firstName, employees.lastName, roles.title, roles.salary, departments.department_name FROM employees LEFT JOIN roles on roles.id=employees.rolesID LEFT JOIN departments on departments.id=roles.department_id;"
        )
        .then((employees) => {
            console.table(employees[0]);
            menuQuestion();
        });
}

function viewEmployeesByManager() {
    db.promise()
        .query(
            "SELECT employees.id, employees.firstName, employees.lastName, roles.title, roles.salary, departments.department_name FROM employees LEFT JOIN roles on roles.id=employees.rolesID LEFT JOIN departments on departments.id=roles.department_id;"
        )
        .then((employees) => {
            console.table(employees[0]);
            menuQuestion();
        });
}

// adding functions of departments, roles, and employees
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "Department name?",
            },
        ])
        .then(function (res) {
            db.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: res.newDepartment,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Department added!");
                    menuQuestion();
                }
            );
        });
}

function addRole() {
    db.promise()
        .query("SELECT * FROM departments")
        .then((res) => {
            const departments = res[0];
            inquirer // prompt user for role info
                .prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "What is the title of the role?",
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is the salary of the role?",
                    },
                    {
                        type: "list",
                        name: "department_id",
                        message: "What is the department of the role?",
                        choices: departments.map((department) => {
                            return {
                                name: department.department_name,
                                value: department.id,
                            };
                        }),
                    },
                ])
                .then((res) => {
                    db.query("INSERT INTO roles SET ?", res, function (err) {
                        if (err) throw err;
                        console.log("Role added!");
                        menuQuestion();
                    });
                });
        });
}

async function addEmployee() {
    const managers = await selectManager();
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the employee being added?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the employee being added?",
            },
            {
                type: "list",
                name: "role",
                choices: await selectRole(),
                message: "What is their role?",
            },
            {
                type: "list",
                name: "manager",
                choices: managers,
                message: "Who is their manager?",
            },
        ]) // insert new employee into database
        .then((res) => {
            db.query(
                "INSERT INTO employees SET ?",
                {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    rolesID: res.role,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added!");
                    menuQuestion();
                }
            );
        });
}

function selectEmployee() {
    return db
        .promise()
        .query("SELECT * FROM employees")
        .then((res) => {
            return res[0].map((employee) => {
                return {
                    name: employee.firstName + " " + employee.lastName,
                    value: employee.id,
                };
            });
        });
}

async function updateEmployees() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "select",
                choices: await selectEmployee(),
                message: "Which employee would you like to update?",
            },
            {
                type: "list",
                name: "assign",
                choices: await selectRole(),
                message: "What is their new role?",
            },
        ])
        .then((res) => {
            db.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        rolesID: res.assign,
                    },
                    {
                        id: res.select,
                    },
                ],
                function (err) {
                    if (err) throw err;
                    console.log("Employee updated!");
                    menuQuestion();
                }
            );
        });
}

function selectManager() {
    return db
        .promise()
        .query("SELECT * FROM employees")
        .then((res) => {
            return res[0].map((employees) => {
                return {
                    name: `${employees.firstName} ${employees.lastName}`,
                    value: employees.rolesID,
                };
            });
        });
}

function selectRole() {
    return db
        .promise()
        .query("SELECT * FROM roles")
        .then((res) => {
            return res[0].map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                };
            });
        });
}

function menuQuestion() {
    inquirer.prompt(mainQuestions).then((answers) => {
        console.log(answers.answer);
        switch (answers.answer) {
            case "View all departments":
                getAllDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "View all employees by manager":
                viewEmployeesByManager();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee":
                updateEmployees();
                break;
            case "Exit":
                console.log("Press Ctrl + C to exit");
                break;
            default:
                break;
        }
    });
}

module.exports = menuQuestion;
