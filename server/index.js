const express = require("express");
const helmet = require("helmet");
// const morgan = require("morgan");
const app = express();

const cors = require("cors");

const Joi = require("joi");

const pool = require("./db");

//middlewares
app.use(cors());
app.use(helmet());
// app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

//Departments Routes
const departmentEndPoint = "/api/departments";

const vlidateDepartment = (department) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
  };
  return Joi.validate(department, schema);
};

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
    if (!department.rows[0])
      return res.status(404).send("no department with the given id");
    res.send(department.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.post(departmentEndPoint, async (req, res) => {
  // const {error} = vlidateDepartment(req.body)
  // if (error) return res.status(400).send(error.details[0].message);

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
  // look up the department if exist continue else send 404
  // const department = await pool.query(
  //     "SELECT * FROM department WHERE department_id =($1)",
  //     [id]
  //   );
  // if (!department.rows[0])
  // return res.status(404).send("no department with the given id");

  //validte the dep name
  // const {error} = vlidateDepartment(req.body)
  // if (error) return res.status(400).send(error.details[0].message);

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
  // look up the department if exist continue else send 404
  // const department = await pool.query(
  //     "SELECT * FROM department WHERE department_id =($1)",
  //     [id]
  //   );
  // if (!department.rows[0])
  // return res.status(404).send("no department with the given id");
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
    if (!product.rows[0])
      return res.status(404).send("no product with the given id");
    res.send(product.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.post(productEndPoint, async (req, res) => {
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
    if (!promotion.rows[0])
      return res.status(404).send("no promotion with the given id");
    res.send(promotion.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

app.post(promotionEndPoint, async (req, res) => {
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

//Products_Promotions Routes
const ppEndPoint = "/api/products-promotions";

app.get(ppEndPoint, async (req, res) => {
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

app.get(`${ppEndPoint}/:product_id`, async (req, res) => {
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

app.post(ppEndPoint, async (req, res) => {
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

app.delete(`${ppEndPoint}/:product_id/:promotion_id`, async (req, res) => {
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
