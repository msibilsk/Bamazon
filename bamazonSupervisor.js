var mysql = require("mysql");
var keys = require("./keys.js")
var Table = require("cli-table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: keys.password,
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});
function addNewDepartment(){
	inquirer.prompt([
			{
				type: 'input',
				message: 'What is the department_name name?',
				name: 'department_name'
			},
			{
				type: 'input',
				message: 'What are the over head costs of the new department?',
				name: 'over_head'
			}

		]).then(function(answers){
			var department_name = answers.department_name; 
			var over_head_costs = answers.over_head;

			connection.query('INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)', [department_name, over_head_costs], function(err, results){
				if(err) throw err;
			});
			runSupervisorFunctions();
		});
};

function printTable() {
    connection.query('SELECT * FROM departments', function(err, results) {
            if (err) throw err;
            var table = new Table({
                head: ['department_id', 'department_name', 'over_head_costs', 'total_sales', 'total_profit']
            });
            var len = results.length;
            for (var i = 0; i < len; i++){
            table.push(
                [(JSON.parse(JSON.stringify(results))[i]["department_id"]), (JSON.parse(JSON.stringify(results))[i]["department_name"]), (JSON.parse(JSON.stringify(results))[i]["over_head_costs"]), (JSON.parse(JSON.stringify(results))[i]["total_sales"]), (results[i].total_sales - results[i].over_head_costs)]);
  			}

        console.log("\n" + table.toString());
        runSupervisorFunctions();
    });
};


function runSupervisorFunctions(){
	inquirer.prompt([
			{
			  type: 'list',
			  message: 'What would you like to do?',
			  choices: ["View Product Sales by Department", "Add New Department"],
			  name: 'options'
			}
		]).then(function(answer){

			if(answer.options === "Add New Department"){
				addNewDepartment();
			} else if(answer.options === "View Product Sales by Department"){
				printTable();
			} else {
				throw err;
			}
		});
};

runSupervisorFunctions();
