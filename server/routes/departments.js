const express = require("express");
const pool = require("../db");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows: departments } = await pool.query("SELECT * FROM department");
    res.send(departments);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("id must be a number");

  try {
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

router.post("/", async (req, res) => {
  const { error } = vlidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { name } = req.body;
    const { rows: departments } = await pool.query("SELECT * FROM department");
    if (departments.find((d) => d.name === name))
      return res.status(400).send("department already exists");

    const newDepartment = await pool.query(
      "INSERT INTO department (name) VALUES($1) RETURNING *",
      [name]
    );
    res.send(newDepartment.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("id must be a number");

  try {
    const { rows: departments } = await pool.query("SELECT * FROM department");

    if (!departments.find((d) => d.department_id === parseInt(id)))
      return res.status(404).send("no department with the given id");

    const { name } = req.body;
    if (departments.find((d) => d.name === name))
      return res.status(400).send("name already exist");

    const { error } = vlidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updateDepartment = await pool.query(
      "UPDATE department SET name = $1 WHERE department_id =$2 RETURNING *",
      [name, id]
    );
    res.send(updateDepartment.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).send("id must be a number");

  try {
    const {
      rows: department,
    } = await pool.query("SELECT * FROM department WHERE department_id =($1)", [
      id,
    ]);
    if (!department[0])
      return res.status(404).send("no department with the given id");

    const {
      rows: relatedProducts,
    } = await pool.query("SELECT * FROM product WHERE dep_id =($1)", [id]);
    if (relatedProducts.length)
      return res.status(400).send("delete related products first");

    const deleteDepartment = await pool.query(
      "DELETE FROM department WHERE department_id = $1 RETURNING *",
      [id]
    );
    res.send(deleteDepartment.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

const vlidate = (data) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
  };
  return Joi.validate(data, schema);
};
