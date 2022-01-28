//inquirer is required to use prompts
const inquirer = require("inquirer");
//team is required to access the HTML formatting
const team = require('./util/generateHtml')
//fs is required to use writeFile 
const fs = require("fs");
//manager, engineer, intern are required to use the classes to construct new ones based on user input
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//manager, engineer, intern arrays are required to save the prompt responses for each class
const managerArr = [];
const engineerArr = [];
const internArr = [];

//the following prompts are for the engineer specifically... these are accessed once the initial manager prompts have been asked
const engQuestions = [
    {
        type: "input",
        message: "what is the engineer's name?",
        name: "engName",
        validate: function (name) {
            valid = /^[A-Za-z\s]*$/.test(name)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid name, for example: Roy Munson")
                return false;
            }
        }    
    },
    {
        type: "input",
        message: "what is the engineer's employee ID?",
        name: "engID",
        validate: function (id) {
            valid = /^[A-Za-z0-9]*$/.test(id)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid ID, for example: 1d444Az")
                return false;
            }
        }
    },
    {
        type: "input",
        message: "what is the engineer's email address?",
        name: "engEmail",
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid email, for example: email@email.com")
                return false;
            }
        }
    },
    {
        type: "input",
        message: "what is the engineer's Github username?",
        name: "engGithub",
        validate: function (name) {
            valid = /^[A-z0-9-]*$/.test(name)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid Github username, for example: bestuserever")
                return false;
            }
        }
    },
]

//the following prompts are for the intern specifically... these are accessed once the initial manager prompts have been asked
const intQuestions = [
    {
        type: "input",
        message: "what is the intern's name?",
        name: "intName",
        validate: function (name) {
            valid = /^[A-Za-z\s]*$/.test(name)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid name, for example: Roy Munson")
                return false;
            }
        }  
    },
    {
        type: "input",
        message: "what is the interns's employee ID?",
        name: "intID",
        validate: function (id) {
            valid = /^[A-Za-z0-9]*$/.test(id)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid ID, for example: 1d444Az")
                return false;
            }
        }
    },
    {
        type: "input",
        message: "what is the interns's email address?",
        name: "intEmail",
        default: () => {},
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid email, for example: email@email.com")
                return false;
            }
        }
    },
    {
        type: "input",
        message: "where does the intern go to school?",
        name: "intSchool",
        validate: function (school) {
            valid = /^[A-Za-z\s]*$/.test(school)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid school name, for example: ABC University")
                return false;
            }
        }  
    },
]


//this following prompts are for the manager specifically...these are the first questions accessed during the execution of the application
inquirer
  .prompt([
    {
      type: "input",
      message: "what is the manager's name?",
      name: "managerName",
      validate: function (name) {
        valid = /^[A-Za-z\s]*$/.test(name)
        if (valid) {
            return true;
        } else {
            console.log("\n Please enter a valid name, for example: Roy Munson")
            return false;
        }
    } 
    },
    {
      type: "input",
      message: "what is the manager's employee ID?",
      name: "managerID",
      validate: function (id) {
        valid = /^[A-Za-z0-9]*$/.test(id)
        if (valid) {
            return true;
        } else {
            console.log("\n Please enter a valid ID, for example: 1d444Az")
            return false;
        }
    }
    },
    {
      type: "input",
      message: "what is the manager's email address?",
      name: "managerEmail",
      validate: function (email) {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
          if (valid) {
              return true;
          } else {
              console.log("\n Please enter a valid email, for example: email@email.com")
              return false;
          }
      }
    },
    {
      type: "input",
      message: "what is the manager's office number?",
      name: "managerNumber",
      validate: function (number) {
        valid = /^[0-9-]*$/.test(number)
        if (valid) {
            return true;
        } else {
            console.log("\n Please enter a valid phone number, for example: 111-111-1111")
            return false;
        }
    } 
    },
  ])
  //the data from the manager prompts is pushed into the manager array to be used later in the generated HTML doc
  .then((ans) => {
    //manager class (from manager.js) is used to construct a new manager object with the manager prompt data
    const newManager = new Manager(
      ans.managerName,
      ans.managerID,
      ans.managerEmail,
      ans.managerNumber
    );
    //the newManager variable is pushed to the manager array
    managerArr.push(newManager);
    //this function buildTeam prompts the user to add engineer or intern or quit
    const buildTeam = () => {
        inquirer.prompt([
            {
               type: "list",
               message: "What would you like to do?",
               choices: ["Add an Engineer","Add an Intern","I'm done building my team. Quit application"],
               name: "addOrQuit" 
            }
        ])
        //then based on the answer to the prompt, there are 3 different possibilites in the if else statements below
        .then((ans) => {
            //if the user selects to add an engineer, a new engineer will be built from the class Engineer that was created in Engineer.js, it will be pushed into the engineer array and the user will be prompted with the buildTeam function again
            if (ans.addOrQuit==="Add an Engineer") {
                inquirer.prompt(engQuestions)
                .then (ans => {
                    const newEngineer = new Engineer(ans.engName, ans.engID, ans.engEmail, ans.engGithub)
                    engineerArr.push(newEngineer)
                    buildTeam();
                })
            //if the user selects to add an intern, a new intern will be built from the class Intern that was created in Intern.js, it will be pushed into the intern array and the user will be prompted with the buildTeam function again 
            } else if (ans.addOrQuit==="Add an Intern") {
                inquirer.prompt(intQuestions)
                .then (ans => {
                    const newIntern = new Intern(ans.intName, ans.intID, ans.intEmail, ans.intSchool)
                    internArr.push(newIntern)
                    buildTeam();
                })
            //if the user selects to quit, the manager array, engineer array, and intern array will all be compiled into one array (team array) that will then be used to write the index.html file
            } else {
                const teamArr = [...managerArr, ...engineerArr, ...internArr]
                fs.writeFile('./dist/index.html',team(teamArr),(err) =>
                    err ? console.log(err) : console.log("Your team's HTML file was built successfully!")
                )
            }
        })
    } ;
    //call buildTeam function to initiate prompt for Engineer/Intern/Quit Application
    buildTeam();
  });

