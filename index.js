const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// Creates the connection to the MySQL Database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_db database.`)
);

userPrompt();

// Prompts the User for Information
function userPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        name: "menuChoice",
      },
    ])
    .then((res) => {
      // Queries the database for all the employees
      if (res.menuChoice == "View All Employees") {
        db.query("SELECT * FROM employee", (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
            userPrompt();
          }
        });
      }
      // Allows user to input another employee
      // TODO: How to make the ROLE and MANAGER list update with the database?
      if (res.menuChoice == "Add Employee") {
        // db.query for employee list and role list
        if (res.menuChoice == "View All Employees") {
          db.query(
            "SELECT name, id AS value FROM role",
            (err, role_results) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "SELECT name, id AS value FROM employee",
                  (err, employee_results) => {
                    if (err) {
                      console.log(err);
                    } else {
                      // userPrompt();
                      inquirer
                        .prompt([
                          {
                            type: "input",
                            message: "Employee's first name:",
                            name: "first_name",
                          },
                          {
                            type: "input",
                            message: "Employee's last name:",
                            name: "last_name",
                          },
                          {
                            type: "list",
                            message: "What is the employee's role?",
                            choices: role_results, // Query result from role table
                            name: "role_id",
                          },
                          {
                            type: "list",
                            message: "Who is the employee's manager?",
                            choices: employee_results, // query result from the employee table
                            name: "manager_id",
                          },
                        ])
                        .then((res) => {
                          db.query(
                            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                            [
                              res.first_name,
                              res.last_name,
                              res.role_id,
                              res.manager_id,
                            ],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                              } else {
                                console.log("Employee added!");
                                userPrompt();
                              }
                            }
                          );
                        });
                    }
                  }
                );
              }
            }
          );
        }
      }
      // Updates the role of an employee
      if (res.menuChoice == "Update Employee Role") {
        db.query("SELECT name, id AS value FROM role", (err, role_results) => {
          if (err) {
            console.log(err);
          } else {
            db.query(
              "SELECT name, id AS value FROM employee",
              (err, employee_results) => {
                if (err) {
                  console.log(err);
                } else {
                  // userPrompt();
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        message: "Which employee's role do you want to udpate?",
                        choices: employee_results,
                        name: "employeeChoice",
                      },
                      {
                        type: "list",
                        message: "What is their new role?",
                        choices: role_results,
                        name: "roleChoice",
                      },
                    ])
                    .then((res) => {
                      db.query(
                        `UPDATE employee SET role_id = ? WHERE id = ?`,
                        [res.roleChoice, res.employeeChoice],
                        (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Employee role updated!");
                            userPrompt();
                          }
                        }
                      );
                    });
                }
              }
            );
          }
        });
      }
      // Queries the database for all the roles
      if (res.menuChoice == "View All Roles") {
        db.query("SELECT * FROM role", (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
            userPrompt();
          }
        });
      }
      // Allows the User to add a role
      if (res.menuChoice == "Add Role") {
        db.query("SELECT name, id AS value FROM department", (err, results) => {
          if (err) {
            console.log(err);
          } else {
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Which role would you like to add?",
                  name: "newRole",
                },
                {
                  type: "input",
                  message: "What is the salary for this role?",
                  name: "newSalary",
                },
                {
                  type: "list",
                  message: "Which department is this role for?",
                  choices: results,
                  name: "roleDepartment",
                },
              ])
              .then((res) => {
                db.query(
                  `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
                  [res.newRole, res.newSalary, res.roleDepartment],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Role added!");
                      userPrompt();
                    }
                  }
                );
              });
          }
        });
      }
      // Queries the database for all of the departments
      if (res.menuChoice == "View All Departments") {
        db.query("SELECT * FROM department", (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
            userPrompt();
          }
        });
      }
      // Adds a department
      if (res.menuChoice == "Add Department") {
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "What is the name of the department you would like to add?",
              name: "newDepartment",
            },
          ])
          .then((res) => {
            db.query(
              `INSERT INTO department (name) VALUE (?)`,
              [res.newDepartment],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Department added!");
                  userPrompt();
                }
              }
            );
          });
      }
      // Exits prompt
      if (res.menuChoice == "Quit") {
        console.log("Goodbye.");
        return;
      }
    });
}
