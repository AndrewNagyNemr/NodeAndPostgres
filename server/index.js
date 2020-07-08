const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db");

//middlewares
app.use(cors());
app.use(express.json());

//Departments Routes
app.get("/api/departments", async (req, res) => {
  try {
    const departments = await pool.query("SELECT * FROM department");
    res.send(departments.rows);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/api/departments/:id", async (req, res) => {
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

app.post("/api/departments", async (req, res) => {
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

app.put("/api/departments/:id", async (req, res) => {
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
app.delete("/api/departments/:id", async (req, res) => {
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
