const express = require("express");
const pool = require("../db");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows: products } = await pool.query("SELECT * FROM product");
    res.send(products);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("id must be a number");

  try {
    const product = await pool.query(
      "SELECT * FROM product WHERE product_id =($1)",
      [id]
    );
    if (!product.rows[0])
      return res.status(404).send("no product with the given id");
    res.send(product.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = vlidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { name, price, dep_id } = req.body;

    const department = await pool.query(
      "SELECT * FROM department WHERE department_id =($1)",
      [dep_id]
    );

    if (!department.rows[0])
      return res.status(400).send("no department with the given id");

    const { rows: products } = await pool.query("SELECT * FROM product");
    if (products.find((p) => p.name === name))
      return res.status(400).send("product name already exist");

    const newProduct = await pool.query(
      "INSERT INTO product (name, price, dep_id) VALUES($1, $2, $3) RETURNING *",
      [name, price, dep_id]
    );
    res.send(newProduct.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (isNaN(id)) return res.status(400).send("id must be a number");

  try {
    const { rows: products } = await pool.query("SELECT * FROM product");

    if (!products.find((p) => p.product_id === parseInt(id)))
      return res.status(404).send("no product with the given id");

    const { name, price, dep_id } = req.body;

    if (products.find((p) => p.name === name && p.product_id !== parseInt(id)))
      return res.status(400).send("Product name already exist");

    const { error } = vlidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updateProduct = await pool.query(
      "UPDATE product SET name=$1, price=$2, dep_id=$3 WHERE product_id =$4 RETURNING *",
      [name, price, dep_id, id]
    );
    res.send(updateProduct.rows[0]);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("id must be a number");

  try {
    const {
      rows: product,
    } = await pool.query("SELECT * FROM product WHERE product_id =($1)", [id]);
    if (!product[0])
      return res.status(404).send("no product with the given id");

    await pool.query("DELETE FROM product_promotion WHERE product_id = $1", [
      id,
    ]);
    const deleteProduct = await pool.query(
      "DELETE FROM product WHERE product_id = $1 RETURNING *",
      [id]
    );
    res.send(deleteProduct.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;

const vlidate = (data) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().positive().required(),
    dep_id: Joi.number().positive().required(),
  };
  return Joi.validate(data, schema);
};
