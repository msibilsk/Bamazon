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
    connection.query('SELECT * from products', function(err, results) {
            if (err) throw err;
            var table = new Table({
                head: ['item_id', 'product_name', 'price']
            });
            var len = results.length;
            for (var i = 0; i < len; i++){
            table.push(
                [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]), (JSON.parse(JSON.stringify(results))[i]["price"])]);
  			}
        console.log("\n" + table.toString());
        makePurchase();
    });
}

function makePurchase(){
	inquirer.prompt([
			{
			  type: 'input',
			  message: '\n What is the item_id of the product you would like to buy?',
			  name: 'product'
			},
			{
			  type: 'input',
			  message: 'How many units would you like to buy?',
			  name: 'quantity'
			}
		]).then(function(answer){
			var quantity = answer.quantity;
			var product = answer.product;

			connection.query('SELECT * FROM products WHERE item_id=?', [product], function(err, results){
				if (err) throw err;
				var stock_quantity = results[0].stock_quantity;
				if (stock_quantity < quantity) {
					console.log("Insufficient quantity in stock!");
				} else{
					stock_quantity -= quantity;
					console.log("Total purchase price: " + quantity * results[0].price);
					connection.query('UPDATE products SET ? WHERE item_id=?', [{stock_quantity: stock_quantity}, product], function(err, results){
						if (err) throw err;
					});
					printTable();
				}
			});
		});
}

printTable();