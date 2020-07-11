const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/", async (req, res) => {
  try {
    const pp = await pool.query(`
      select product.product_id, product.name, product.dep_id, product.price, promotion.code, promotion.discount, promotion.active
      from promotion
      join product_promotion pp
      on promotion.promotion_id = pp.promotion_id
      join product
      on product.product_id = pp.product_id`);
    res.send(pp.rows);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const pp = await pool.query(
      "SELECT promotion_id FROM product_promotion WHERE product_id =($1)",
      [product_id]
    );
    if (!pp.rows[0])
      return res.status(404).send("no product with the given id");
    res.send(pp.rows);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { product_id, promotion_id } = req.body;
    const pp = await pool.query(
      "INSERT INTO product_promotion(product_id, promotion_id) VALUES($1 , $2) RETURNING *",
      [product_id, promotion_id]
    );
    res.send(pp.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:product_id/:promotion_id", async (req, res) => {
  try {
    const { product_id, promotion_id } = req.params;
    const deletePP = await pool.query(
      "DELETE FROM product_promotion WHERE product_id= $1 and promotion_id=$2 RETURNING *",
      [product_id, promotion_id]
    );
    res.send(deletePP.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
