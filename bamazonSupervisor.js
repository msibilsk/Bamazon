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
    });
};

printTable();