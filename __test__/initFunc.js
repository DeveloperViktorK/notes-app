const Users = require("../controllers/users.controller");

// Init DB test data
exports.initializeDB = async (user) => {
  try {
    await Users.delete(user);
  } catch (error) {
    throw new Error("Ошибка очистки БД: " + error.message);
  }
};
// Clear DB from test data
exports.clearDB = async (user) => {
  try {
    await Users.delete(user);
  } catch (error) {
    throw new Error("Ошибка очистки БД: " + error.message);
  }
};
