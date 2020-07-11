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