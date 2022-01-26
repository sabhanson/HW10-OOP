const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const manager = [];

inquirer
  .prompt([
    {
      type: "input",
      message: "what is the manager's name?",
      name: "managerName",
    },
    {
      type: "input",
      message: "what is the manager's ID?",
      name: "managerID",
    },
    {
      type: "input",
      message: "what is the manager's email?",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "what is the manager's office number?",
      name: "managerNumber",
    },
  ])
  .then((ans) => {
    const newManager = new Manager(
      ans.managerName,
      ans.managerID,
      ans.managerEmail,
      ans.managerNumber
    );
    manager.push(newManager);
    console.log(manager)
  });
