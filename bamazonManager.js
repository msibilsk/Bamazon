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
    connection.query('SELECT * FROM products', function(err, results) {
            if (err) throw err;
            var table = new Table({
                head: ['item_id', 'product_name', 'price', 'stock_quantity']
            });
            var len = results.length;
            for (var i = 0; i < len; i++){
            table.push(
                [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]), (JSON.parse(JSON.stringify(results))[i]["price"]), (JSON.parse(JSON.stringify(results))[i]["stock_quantity"])]);
  			}
        console.log("\n" + table.toString());
    });
};

function printLowQuantity() {
    connection.query('SELECT * from products', function(err, results) {
        if (err) throw err;
        var table = new Table({
            head: ['item_id', 'product_name', 'price', 'stock_quantity']
        });
        var len = results.length;
        for (var i = 0; i < len; i++){
        	if(results[i].stock_quantity < 5) {
	            table.push(
	                [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]), (JSON.parse(JSON.stringify(results))[i]["price"]), (JSON.parse(JSON.stringify(results))[i]["stock_quantity"])]);
	  		}
		}
        console.log("\n" + table.toString());
    });
};

function addInventory() {
	printTable();
	//question is coming up before the table
	inquirer.prompt([
		{
		  type: 'input',
		  message: '\n What is the item_id of the product you want to add?',
		  name: 'product'
		},
		{
		  type: 'input',
		  message: 'How many units would you like to add to the stock_quantity?',
		  name: 'quantity'
		}
	]).then(function(answer){
		var quantity = parseInt(answer.quantity);
		var product = answer.product;
		var currentQuantity;
		connection.query('SELECT stock_quantity FROM products WHERE item_id=?', [product], function(err, results){
			currentQuantity = parseInt(results[0].stock_quantity);
			connection.query('UPDATE products SET ? WHERE item_id=?', 
				[
	             {stock_quantity: quantity + currentQuantity},
	             product
	            ], 
            	function(err, results){
					if (err) throw err;
			});
		});

		console.log("Here are the updated amounts:");
		//printTable(); <-- need to make it so the table actually updates
		
	});
};

function addNewProduct(){
	inquirer.prompt([
			{
				type: 'input',
				message: 'What is the product name?',
				name: 'product_name'
			},
			{
				type: 'input',
				message: 'What is the price?',
				name: 'price'
			},
			{
				type: 'input',
				message: 'What department does this item belong to?',
				name: 'department_name'
			},
			{

				type: 'input',
				message: 'What is the stock quantity?',
				name: 'stock_quantity'
			}
		]).then(function(answers){
			var product_name = answers.product_name; 
			var price = answers.price;
			var stock_quantity = answers.stock_quantity;
			var department_name = answers.department_name;

			connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', [product_name, department_name, price, stock_quantity], function(err, results){
				if(err) throw err;
			});
		});
};

function runManagerFunctions(){
	inquirer.prompt([
			{
			  type: 'list',
			  message: 'What would you like to do?',
			  choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
			  name: 'options'
			}
		]).then(function(results){
			switch(results.options){
				case "View Products for Sale":
					printTable();
					break;
				case "View Low Inventory":
					printLowQuantity();
					break;
				case "Add to Inventory": 
					addInventory();
					break;
				case "Add New Product":
					addNewProduct();
					break;
			}
	});
};

runManagerFunctions();