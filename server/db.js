const config = require("config");
const { Pool } = require("pg");

const pool = new Pool(config.get("dbConf"));
module.exports = pool;
