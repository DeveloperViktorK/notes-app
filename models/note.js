const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const note = sequelize.define("Note", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  noteTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  note: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shared: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = note;
