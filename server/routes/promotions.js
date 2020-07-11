const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const promotions = await pool.query("SELECT * FROM promotion");
    res.send(promotions.rows);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await pool.query(
      "SELECT * FROM promotion WHERE promotion_id =($1)",
      [id]
    );
    if (!promotion.rows[0])
      return res.status(404).send("no promotion with the given id");
    res.send(promotion.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { code, active, discount } = req.body;
    const newPromotion = await pool.query(
      "INSERT INTO promotion(code, active, discount) VALUES($1 , $2, $3) RETURNING *",
      [code, active, discount]
    );
    res.send(newPromotion.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatePromotion = await pool.query(
      "UPDATE promotion SET name = $1 WHERE promotion_id =$2 RETURNING *",
      [name, id]
    );
    res.send(updatePromotion.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePromotion = await pool.query(
      "DELETE FROM promotion WHERE promotion_id = $1 RETURNING *",
      [id]
    );
    res.send(deletePromotion.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
