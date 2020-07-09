const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db");

//middlewares
app.use(cors());
app.use(express.json());

//Promotions Routes
const promotionEndPoint = "/api/promotions";
app.get(promotionEndPoint, async (req, res) => {
  try {
    const promotions = await pool.query("SELECT * FROM promotion");
    res.send(promotions.rows);
  } catch (error) {
    res.send(error.message);
  }
});

app.get(`${promotionEndPoint}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await pool.query(
      "SELECT * FROM promotion WHERE promotion_id =($1)",
      [id]
    );
    res.send(promotion.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.post(promotionEndPoint, async (req, res) => {
  try {
    const { name } = req.body;
    const newPromotion = await pool.query(
      "INSERT INTO promotion (name) VALUES($1) RETURNING *",
      [name]
    );
    res.send(newPromotion.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.put(`${promotionEndPoint}/:id`, async (req, res) => {
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

app.delete(`${promotionEndPoint}/:id`, async (req, res) => {
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
