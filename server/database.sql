CREATE DATABASE truflaDB;

CREATE TABLE department(
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE product(
    product_id SERIAL UNIQUE,
    dep_id integer NOT NULL REFERENCES department(department_id),
    name VARCHAR(50) UNIQUE NOT NULL,
    price integer NOT NULL, 
    PRIMARY KEY(product_id, dep_id)
);

CREATE TABLE promotion(
    promotion_id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    active boolean NOT NULL, 
    discount integer
);

CREATE TABLE product_promotion(
    product_id integer NOT NULL REFERENCES product(product_id),
    promotion_id integer NOT NULL REFERENCES promotion(promotion_id),
    PRIMARY KEY(product_id, promotion_id)
);

select product.product_id, product.name, promotion.code, promotion.discount, promotion.active
    from promotion
    join product_promotion pp
    on promotion.promotion_id = pp.promotion_id
    join product
    on product.product_id = pp.product_id
    where product.id = $1;