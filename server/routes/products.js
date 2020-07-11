const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM product");
    res.send(products.rows);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
  try {
    const { name, price, dep_id } = req.body;
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
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateProduct = await pool.query(
      "UPDATE product SET name = $1 WHERE product_id =$2 RETURNING *",
      [name, id]
    );
    res.send(updateProduct.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
