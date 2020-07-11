const express = require("express");
const helmet = require("helmet");
// const morgan = require("morgan");
const products = require("./routes/products");
const promotions = require("./routes/promotions");
const productsPromos = require("./routes/productsPromos");
const departments = require("./routes/departments");

const app = express();

const cors = require("cors");

const Joi = require("joi");

//middlewares
app.use(cors());
app.use(helmet());
// app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/departments", departments);
app.use("/api/products", products);
app.use("/api/promotions", promotions);
app.use("/api/products-promotions", productsPromos);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
