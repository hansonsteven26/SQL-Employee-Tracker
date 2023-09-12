const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const Rx = require('rxjs');
const prompts = new Rx.Subject();
let exit = false;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);


inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee',
            ],
            name: 'choice',
        },
    ])
    .then((response) => {
        response.choice = response.choice.toLowerCase();
        if (response.choice == "update an employee") {
            // let employees = viewEmployees(newArray)
            // console.log(employees)
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Which employee\'s id do you want to update?',
                    name: 'empUpdate',
                },
                {
                    type: 'input',
                    message: 'What is the new role id for this employee?',
                    name: 'newRole',
                },
            ])
                .then((response) => {
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.newRole, response.empUpdate], (err, results) => {
                        err ? console.error(err) : console.table(results);
                    });
                })
        }
        if (response.choice == "view all departments") {
            db.query('SELECT * FROM department', (err, results) => {
                err ? console.error(err) : console.table(results);
            });
        }
        if (response.choice == "view all roles") {
            db.query('SELECT * FROM role', (err, results) => {
                err ? console.error(err) : console.table(results);
            });
        }
        if (response.choice == "view all employees") {
            db.query('SELECT * FROM employee', (err, results) => {
                err ? console.error(err) : console.table(results);
            });
        }
        if (response.choice == "add a department") {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What department do you want to add?',
                        name: 'newDept',
                    },
                ])
                .then((response) => {
                    db.query('INSERT INTO department (name) VALUES (?)', response.newDept, (err, results) => {
                        err ? console.error(err) : console.table(results);
                    })
                })
        }
        if (response.choice == "add a role") {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What role do you want to add?',
                        name: 'newRole',
                    },
                    {
                        type: 'input',
                        message: 'What is this role\'s salary?',
                        name: 'newRoleSalary',
                    },
                    {
                        type: 'input',
                        message: 'What department does this role belong to?',
                        name: 'newRoleDeptId',
                    },
                ])
                .then((response) => {
                    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.newRole, response.newRoleSalary, response.newRoleDeptId], (err, results) => {
                        err ? console.error(err) : console.table(results);
                    })
                })
        }
        if (response.choice == "add an employee") {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the first name of the new employee?',
                        name: 'newEmployeeFirst',
                    },
                    {
                        type: 'input',
                        message: 'What is the last name of the new employee?',
                        name: 'newEmployeeLast',
                    },
                    {
                        type: 'input',
                        message: 'What is the new employee\'s role ID?',
                        name: 'newEmployeeRoleId',
                    },
                    {
                        type: 'input',
                        message: 'What is the new employee\'s manager ID (if applicable)?',
                        name: 'newEmployeeMngrId',
                    },
                ])
                .then((response) => {
                    if (response.newEmployeeMngrId == '') {
                        response.newEmployeeMngrId = null;
                    }
                    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [response.newEmployeeFirst, response.newEmployeeLast, response.newEmployeeRoleId, response.newEmployeeMngrId], (err, results) => {
                        err ? console.error(err) : console.table(results);
                    })
                })
        }
    })
    .catch((err) => {
        console.error(err);
    })

