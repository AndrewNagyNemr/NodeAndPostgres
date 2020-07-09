const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db");

//middlewares
app.use(cors());
app.use(express.json());

//Departments Routes
const departmentEndPoint = "/api/departments";

app.get(departmentEndPoint, async (req, res) => {
  try {
    const departments = await pool.query("SELECT * FROM department");
    res.send(departments.rows);
  } catch (error) {
    res.send(error.message);
  }
});

app.get(`${departmentEndPoint}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const department = await pool.query(
      "SELECT * FROM department WHERE department_id =($1)",
      [id]
    );
    res.send(department.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.post(departmentEndPoint, async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = await pool.query(
      "INSERT INTO department (name) VALUES($1) RETURNING *",
      [name]
    );
    res.send(newDepartment.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.put(`${departmentEndPoint}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateDepartment = await pool.query(
      "UPDATE department SET name = $1 WHERE department_id =$2 RETURNING *",
      [name, id]
    );
    res.send(updateDepartment.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});
app.delete(`${departmentEndPoint}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDepartment = await pool.query(
      "DELETE FROM department WHERE department_id = $1 RETURNING *",
      [id]
    );
    res.send(deleteDepartment.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

//Products Routes
const productEndPoint = "/api/products";

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
