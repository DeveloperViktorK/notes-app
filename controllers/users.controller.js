const User = require("../models/user");

exports.create = async (user) => {
  try {
    const createRes = await User.create(user);
    return createRes;
  } catch (error) {
    throw new Error("Ошибка создания записи в БД: " + error.message);
  }
};
exports.find = async (userEmail) => {
  try {
    const user = await User.findAll({
      where: {
        email: userEmail,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Ошибка поиска в БД: " + error.message);
  }
};

exports.delete = async (userEmail) => {
  try {
    const deleteRes = await User.destroy({
      where: {
        email: userEmail,
      },
    });
    return deleteRes;
  } catch (error) {
    throw new Error("Ошибка удаления записи в БД: " + error.message);
  }
};
