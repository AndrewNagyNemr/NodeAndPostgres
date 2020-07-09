const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db");

//middlewares
app.use(cors());
app.use(express.json());

const productEndPoint = "/api/products";
//Products Routes
app.get(productEndPoint, async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM product");
    res.send(products.rows);
  } catch (error) {
    res.send(error.message);
  }
});

app.get(`${productEndPoint}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "SELECT * FROM product WHERE product_id =($1)",
      [id]
    );
    res.send(product.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.post(productEndPoint, async (req, res) => {
  try {
    const { name } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO product (name) VALUES($1) RETURNING *",
      [name]
    );
    res.send(newProduct.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.put(`${productEndPoint}/:id`, async (req, res) => {
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

app.delete(`${productEndPoint}/:id`, async (req, res) => {
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
