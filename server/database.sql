-- if you are using window machine 
    -- => set trufla_user="Enter your db username here"
    -- => set trufla_password="Enter your db password here"
    -- => set trufla_port="Enter your db port here"
    -- => set trufla_password="Enter your password here"
-- if you are using mac or linux machine =>replace "set" with "export"

CREATE DATABASE truflaDB;

CREATE TABLE department(
    name VARCHAR(50) PRIMARY KEY
);

CREATE TABLE product(
    name VARCHAR(50) PRIMARY KEY,
    price integer NOT NULL,
    dep_name VARCHAR(50) NOT NULL REFERENCES department(name)
);

CREATE TABLE promotion(
    code VARCHAR(50) PRIMARY KEY,
    discount integer NOT NULL,
    active boolean NOT NULL 
);

CREATE TABLE product_promotion(
    product_name VARCHAR(50) NOT NULL REFERENCES product(name),
    promotion_code VARCHAR(50) NOT NULL REFERENCES promotion(code),
    PRIMARY KEY(product_name, promotion_code)
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

Insert Into product(name, dep_name, price) VALUES('Ipade', 'Tables', 5000);
Insert Into product(name, dep_name, price) VALUES('Samsung Tab', 'Tables', 4000);
Insert Into product(name, dep_name, price) VALUES('Galaxy', 'Tables', 4000);
Insert Into product(name, dep_name, price) VALUES('Lenovo Tab', 'Tables', 3000);
Insert Into product(name, dep_name, price) VALUES('Macbook Pro', 'Laptops', 10000);
Insert Into product(name, dep_name, price) VALUES('Dell inspiron', 'Laptops', 6000);
Insert Into product(name, dep_name, price) VALUES('HP xps', 'Laptops', 1000);
Insert Into product(name, dep_name, price) VALUES('Thinkpad', 'Laptops', 6000);
Insert Into product(name, dep_name, price) VALUES('Samsung', 'Screens', 10000);
Insert Into product(name, dep_name, price) VALUES('LG', 'Screens', 8000);
Insert Into product(name, dep_name, price) VALUES('Tochiba', 'Screens', 6000);
Insert Into product(name, dep_name, price) VALUES('El-Araby', 'Screens', 6000);
Insert Into product(name, dep_name, price) VALUES('Iphone X', 'Mobile Phones', 15000);
Insert Into product(name, dep_name, price) VALUES('Note 10', 'Mobile Phones', 12000);
Insert Into product(name, dep_name, price) VALUES('Samsung S9+', 'Mobile Phones', 10000);
Insert Into product(name, dep_name, price) VALUES('Samsung Note 10', 'Mobile Phones', 16000);
Insert Into product(name, dep_name, price) VALUES('Airpod', 'Electronics', 4000);
Insert Into product(name, dep_name, price) VALUES('Airpod pro', 'Electronics', 6000);
Insert Into product(name, dep_name, price) VALUES('BeatsX', 'Electronics', 5000);
Insert Into product(name, dep_name, price) VALUES('Samsung Charger', 'Electronics', 200);