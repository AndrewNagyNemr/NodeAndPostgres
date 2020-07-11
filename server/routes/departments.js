const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const departments = await pool.query("SELECT * FROM department");
    res.send(departments.rows);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const department = await getDepartment(id);
  if (!department)
    return res.status(404).send("no department with the given id");
  try {
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

const getDepartment = async (id) => {
  const department = await pool.query(
    "SELECT * FROM department WHERE department_id =($1)",
    [id]
  );
  return department.rows[0];
};

const vlidateDepartment = (department) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
  };
  return Joi.validate(department, schema);
};
