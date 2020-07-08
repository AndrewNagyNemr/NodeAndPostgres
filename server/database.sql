CREATE DATABASE truflaDB;

CREATE TABLE department(
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    price integer NOT NULL, 
    dep_id integer NOT NULL,
    PRIMARY KEY(product_id, dep_id),
);