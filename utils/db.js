const Sequelize = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
  config.get("DB_NAME"),
  config.get("USER_NAME"),
  config.get("PASSWORD"),
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
