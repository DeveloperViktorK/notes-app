const Note = require("../models/note");
const { getPagingData } = require("../lib/pagination");

exports.create = async (note) => {
  try {
    const createRes = await Note.create(note);
    return createRes;
  } catch (error) {
    throw new Error("Ошибка создания записи в БД: " + error.message);
  }
};
exports.find = async (id) => {
  try {
    const note = await Note.findByPk(id);
    return note;
  } catch (error) {
    throw new Error("Ошибка поиска в БД: " + error.message);
  }
};

exports.update = async (note) => {
  try {
    const updateRes = await Note.save(note);
    return updateRes;
  } catch (error) {
    throw new Error("Ошибка редактирования записи в БД: " + error.message);
  }
};

exports.delete = async (note) => {
  try {
    const deleteRes = await Note.destroy(note);
    return deleteRes;
  } catch (error) {
    throw new Error("Ошибка удаления записи в БД: " + error.message);
  }
};

exports.findAll = async (owner, page, limit, offset) => {
  try {
    const notes = await Note.findAndCountAll({
      where: { owner: owner },
      limit,
      offset,
    });
    return getPagingData(notes, page, limit);
  } catch (error) {
    throw new Error("Ошибка поиска записей в БД: " + error.message);
  }
};
