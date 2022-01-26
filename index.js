const inquirer = require("inquirer");
const team = require('./util/generateHtml')
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const managerArr = [];
const engineerArr = [];
const internArr = [];

//these questions are about the engineer
const engQuestions = [
    {
        type: "input",
        message: "What is the engineer's name",
        name: "engName",
    },
    {
        type: "input",
        message: "What is the engineer's ID",
        name: "engID",
    },
    {
        type: "input",
        message: "What is the engineer's email",
        name: "engEmail",
    },
    {
        type: "input",
        message: "What is the engineer's Github username?",
        name: "engGithub",
    },
]

//these questions are about the intern
const intQuestions = [
    {
        type: "input",
        message: "What is the intern's name",
        name: "intName",
    },
    {
        type: "input",
        message: "What is the interns's ID",
        name: "intID",
    },
    {
        type: "input",
        message: "What is the interns's email",
        name: "intEmail",
    },
    {
        type: "input",
        message: "Where does the Intern go to school?",
        name: "intSchool",
    },
]


//this inquirer asks the first mandatory questions about the manager
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
    managerArr.push(newManager);
    console.log(managerArr);
    const questions = () => {
        inquirer.prompt([
            {
               type: "list",
               message: "What would you like to do?",
               choices: ["Add an Engineer","Add an Intern","Quit"],
               name: "initial" 
            }
        ])
        .then((ans) => {
            if (ans.initial==="Add an Engineer") {
                inquirer.prompt(engQuestions)
                .then (ans => {
                    const newEngineer = new Engineer(ans.engName, ans.engID, ans.engEmail, ans.engGithub)
                    engineerArr.push(newEngineer)
                    console.log(engineerArr)
                    questions();
                })
            } else if (ans.initial==="Add an Intern") {
                inquirer.prompt(intQuestions)
                .then (ans => {
                    const newIntern = new Intern(ans.intName, ans.intID, ans.intEmail, ans.intSchool)
                    internArr.push(newIntern)
                    console.log(internArr)
                    questions();
                })
            } else {
                const teamArr = [...managerArr, ...engineerArr, ...internArr]
                fs.writeFile('index.html',team(teamArr),(err) =>
                    err ? console.log(err) : console.log("success")
                )
            }
        })
    } ;
    questions();
  });

