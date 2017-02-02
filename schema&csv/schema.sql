CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL primary key,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lipstick", "Beauty", 7, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mascara", "Beauty", 20, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blush", "Beauty", 10, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eyeshadow Pallete", "Beauty", 30, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Handbag", "Accessories", 50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scarf", "Accessories", 15, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wallet", "Accessories", 30, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Denim", "Apparel", 60, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blouse", "Apparel", 25, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dress", "Apparel", 75, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boots", "Shoes", 150, 15);