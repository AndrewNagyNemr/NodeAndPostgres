const express = require("express");
const pool = require("../db");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows: promotions } = await pool.query("SELECT * FROM promotion");
    res.send(promotions);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("id must be a number");

  try {
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
  const { error } = vlidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { code, active, discount } = req.body;
    const { rows: promotions } = await pool.query("SELECT * FROM promotion");
    if (promotions.find((p) => p.code === code))
      return res.status(400).send("code already exists");

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
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("id must be a number");

  try {
    const { rows: promotions } = await pool.query("SELECT * FROM promotion");

    if (!promotions.find((p) => p.promotion_id === parseInt(id)))
      return res.status(404).send("no promotion with the given id");

    const { code, active, discount } = req.body;

    if (
      promotions.find((p) => p.code === code && p.promotion_id !== parseInt(id))
    )
      return res.status(400).send("Promotion name already exists");

    const { error } = vlidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatePromotion = await pool.query(
      "UPDATE promotion SET code=$1, active=$2, discount=$3 WHERE promotion_id =$4 RETURNING *",
      [code, active, discount, id]
    );
    res.send(updatePromotion.rows[0]);
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
      rows: promotion,
    } = await pool.query("SELECT * FROM promotion WHERE promotion_id =($1)", [
      id,
    ]);
    if (!promotion[0])
      return res.status(404).send("no promotion with the given id");

    await pool.query("DELETE FROM product_promotion WHERE promotion_id = $1", [
      id,
    ]);
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

const vlidate = (data) => {
  const schema = {
    code: Joi.string().min(3).max(50).required(),
    active: Joi.boolean().required(),
    discount: Joi.number().min(1).max(99).required(),
  };
  return Joi.validate(data, schema);
};
