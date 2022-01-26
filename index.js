//inquirer is so we can use the prompts
const inquirer = require("inquirer");
//team is so we can use the generateHTML js file
const team = require('./util/generateHtml')
//fs is required to be able to write the file at the end
const fs = require("fs");
//manager, engineer, intern are required to use the classes to construct new ones based on user input
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//manager, engineer, intern arrays are required to save the prompt responses for each class
const managerArr = [];
const engineerArr = [];
const internArr = [];

//these questions are about the engineer
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
                console.log("\n Please enter a valid name")
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
                console.log("\n Please enter a valid ID")
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
                console.log("\n Please enter a valid email")
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
                console.log("\n Please enter a valid name")
                return false;
            }
        }
    },
]

//these questions are about the intern
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
                console.log("\n Please enter a valid name")
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
                console.log("\n Please enter a valid ID")
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
                console.log("\n Please enter a valid email")
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
                console.log("\n Please enter a valid school name")
                return false;
            }
        }  
    },
]


//this inquirer asks the first mandatory questions about the manager
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
            console.log("\n Please enter a valid name")
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
            console.log("\n Please enter a valid ID")
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
              console.log("\n Please enter a valid email")
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
            console.log("\n Please enter a valid name")
            return false;
        }
    } 
    },
  ])
  //then from the prompt answers, this data is pushed into the manager array to be used later in the generated HTML doc
  .then((ans) => {
    //manager class (from manager.js) with the data we want to use for the parameters
    const newManager = new Manager(
      ans.managerName,
      ans.managerID,
      ans.managerEmail,
      ans.managerNumber
    );
    managerArr.push(newManager);
    //next question here, prompts user to add engineer or intern or quit
    const buildTeam = () => {
        inquirer.prompt([
            {
               type: "list",
               message: "What would you like to do?",
               choices: ["Add an Engineer","Add an Intern","I'm done building my team. Quit application"],
               name: "initial" 
            }
        ])
        //then with the input from the prompt above, do something from this if else statement
        .then((ans) => {
            //if they choose to add an engineer, a new engineer will be built from the class Engineer that we created in Engineer.js, it will be pushed into the engineer array and the user will be prompted with the question again
            if (ans.initial==="Add an Engineer") {
                inquirer.prompt(engQuestions)
                .then (ans => {
                    const newEngineer = new Engineer(ans.engName, ans.engID, ans.engEmail, ans.engGithub)
                    engineerArr.push(newEngineer)
                    buildTeam();
                })
            //if they choose to add an intern, a new intern will be built from the class Intern that we created in Intern.js, it will be pushed into the intern array and the user will be prompted with the questions again    
            } else if (ans.initial==="Add an Intern") {
                inquirer.prompt(intQuestions)
                .then (ans => {
                    const newIntern = new Intern(ans.intName, ans.intID, ans.intEmail, ans.intSchool)
                    internArr.push(newIntern)
                    buildTeam();
                })
            //if they choose to quit, the manager array, engineer array, and intern array will all be compiled into one array (team array) that will then be used to write the index.html file
            } else {
                const teamArr = [...managerArr, ...engineerArr, ...internArr]
                fs.writeFile('./dist/index.html',team(teamArr),(err) =>
                    err ? console.log(err) : console.log("Your team's HTML file was built successfully!")
                )
            }
        })
    } ;
    buildTeam();
  });

