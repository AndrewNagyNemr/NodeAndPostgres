//if you are using window machine
//    => set DBname="Enter your db name here"
//    => set trufla_user="Enter your db username here"
//    => set trufla_password="Enter your db password here"
//    => set trufla_port="Enter your db port here"
//    => set trufla_host="Enter your host here"
//if you are using mac or linux machine =>replace "set" with "export"

const pool = require("./db");

try {
  pool.query(`
  CREATE TABLE department(
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    price integer NOT NULL,
    dep_id INTEGER NOT NULL REFERENCES department(department_id)
);

CREATE TABLE promotion(
    promotion_id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount integer NOT NULL,
    active boolean NOT NULL 
);

CREATE TABLE product_promotion(
    product_id INTEGER NOT NULL REFERENCES product(product_id),
    promotion_id INTEGER NOT NULL REFERENCES promotion(promotion_id),
    PRIMARY KEY(product_id, promotion_id)
);

Insert Into department(name) VALUES('Electronics');
Insert Into department(name) VALUES('Mobile Phones');
Insert Into department(name) VALUES('Screens');
Insert Into department(name) VALUES('Laptops');
Insert Into department(name) VALUES('Tables');

Insert Into promotion(code, discount, active) VALUES('less10', 10, true);
Insert Into promotion(code, discount, active) VALUES('less15', 15, true);
Insert Into promotion(code, discount, active) VALUES('less20', 20, true);
Insert Into promotion(code, discount, active) VALUES('less30', 30, false);

Insert Into product(name, dep_id, price) VALUES('Ipade', (select department_id from department where name = 'Tables'), 5000);
Insert Into product(name, dep_id, price) VALUES('Samsung Tab', (select department_id from department where name = 'Tables'), 4000);
Insert Into product(name, dep_id, price) VALUES('Galaxy', (select department_id from department where name = 'Tables'), 4000);
Insert Into product(name, dep_id, price) VALUES('Lenovo Tab', (select department_id from department where name = 'Tables'), 3000);
Insert Into product(name, dep_id, price) VALUES('Macbook Pro', (select department_id from department where name = 'Laptops'), 10000);
Insert Into product(name, dep_id, price) VALUES('Dell inspiron', (select department_id from department where name = 'Laptops'), 6000);
Insert Into product(name, dep_id, price) VALUES('HP xps', (select department_id from department where name = 'Laptops'), 1000);
Insert Into product(name, dep_id, price) VALUES('Thinkpad', (select department_id from department where name = 'Laptops'), 6000);
Insert Into product(name, dep_id, price) VALUES('Samsung', (select department_id from department where name = 'Screens'), 10000);
Insert Into product(name, dep_id, price) VALUES('LG TV', (select department_id from department where name = 'Screens'), 8000);
Insert Into product(name, dep_id, price) VALUES('Tochiba', (select department_id from department where name = 'Screens'), 6000);
Insert Into product(name, dep_id, price) VALUES('El-Araby', (select department_id from department where name = 'Screens'), 6000);
Insert Into product(name, dep_id, price) VALUES('Iphone X', (select department_id from department where name = 'Mobile Phones'), 15000);
Insert Into product(name, dep_id, price) VALUES('Note 10', (select department_id from department where name = 'Mobile Phones'), 12000);
Insert Into product(name, dep_id, price) VALUES('Samsung S9+', (select department_id from department where name = 'Mobile Phones'), 10000);
Insert Into product(name, dep_id, price) VALUES('Samsung Note 10', (select department_id from department where name = 'Mobile Phones'), 16000);
Insert Into product(name, dep_id, price) VALUES('Airpod', (select department_id from department where name = 'Electronics'), 4000);
Insert Into product(name, dep_id, price) VALUES('Airpod pro', (select department_id from department where name = 'Electronics'), 6000);
Insert Into product(name, dep_id, price) VALUES('BeatsX', (select department_id from department where name = 'Electronics'), 5000);
Insert Into product(name, dep_id, price) VALUES('Samsung Charger', (select department_id from department where name = 'Electronics'), 200);


Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'Ipade'), (select promotion_id from promotion where code = 'less20'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'Ipade'), (select promotion_id from promotion where code = 'less10'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'Samsung'), (select promotion_id from promotion where code = 'less10'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'Samsung'), (select promotion_id from promotion where code = 'less20'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'Airpod'), (select promotion_id from promotion where code = 'less15'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'Airpod'), (select promotion_id from promotion where code = 'less20'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'Samsung Charger'), (select promotion_id from promotion where code = 'less10'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'Samsung Charger'), (select promotion_id from promotion where code = 'less20'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'LG TV'), (select promotion_id from promotion where code = 'less20'));
Insert Into product_promotion(product_id, promotion_id) VALUES((select product_id from product where name = 'LG TV'), (select promotion_id from promotion where code = 'less15'));
`);
} catch (error) {
  console.log(error);
}
