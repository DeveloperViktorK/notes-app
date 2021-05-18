const config = require("config");
const mysql = require("mysql2/promise");
const sequelize = require("../utils/db");

module.exports = function dbInit() {
  try {
    initialize();

    async function initialize() {
      // create db if it doesn't already exist

      const database = process.env.DB_NAME || config.get("DB_NAME");
      const host = process.env.DB_HOST || config.get("HOST");
      const port = process.env.MY_SQL_PORT || config.get("MY_SQL_PORT");
      const user = process.env.DB_USER || config.get("USER_NAME");
      const password = process.env.DB_PASSWORD || config.get("PASSWORD");
      const connection = await mysql.createConnection({
        host,
        port,
        user,
        password,
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
      connection.destroy();

      // sync all models with database
      await sequelize.sync();
    }
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
};
