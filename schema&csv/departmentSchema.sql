USE Bamazon;

CREATE TABLE departments(
	department_id INTEGER(11) AUTO_INCREMENT NOT NULL primary key,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    total_sales DECIMAL(10,2) NOT NULL
);

ALTER TABLE products
  ADD product_sales DECIMAL(10,2) NOT NULL;