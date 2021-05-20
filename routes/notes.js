var express = require("express");
var router = express.Router();
const Notes = require("../controllers/notes.controller");

const auth = require("../lib/middleware/auth.middleware");

const noteValidator = require("../utils/note-validator");
const { getPagination } = require("../lib/pagination");

/* GET notes. */
router.get("/", auth, async function (req, res, next) {
  try {
    // notes?page=1&size=5
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const noteItems = await Notes.findAll(req.email, page, limit, offset);
    if (noteItems) {
      return res.status(200).json(noteItems);
    } else {
      return res.status(204).json(noteItems);
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Ошибка на сервере", error });
  }
});

// Get note
router.get("/:id", auth, async (req, res) => {
  try {
    if (!Number.isInteger(+req.params.id)) {
      return res.status(400).json("");
    }
    const note = await Notes.find(+req.params.id);
    if (note) {
      if (note && (note.shared || note.owner === req.email)) {
        return res.status(200).json({ note: note.toJSON() });
      } else {
        return res.status(403).json({ message: "Нет доступа" });
      }
    } else {
      return res
        .status(204)
        .json({ note: null, message: "Заметка не найдена" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Ошибка на сервере", error });
  }
});

// Add note
router.post("/", auth, async (req, res) => {
  try {
    const note = {
      noteTitle: req.body.noteTitle,
      note: req.body.note,
      owner: req.email,
      shared: !!req.body.shared,
    };
    const { isValid, reason } = noteValidator(note);
    if (!isValid)
      return res.status(400).json({ message: `Заметка не создана. ${reason}` });
    await Notes.create(note);
    return res.status(201).json("");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// Update note
router.put("/:id", auth, async (req, res) => {
  try {
    if (!Number.isInteger(+req.params.id)) {
      return res.status(400).json("");
    }
    const note = await Notes.find(+req.params.id);
    if (note) {
      note.noteTitle = req.body.noteTitle;
      note.note = req.body.note;
      note.owner = req.email;
      note.shared = !!req.body.shared;
      const { isValid, reason } = noteValidator(note.toJSON());
      if (!isValid)
        return res
          .status(400)
          .json({ message: `Заметка не отредактирована. ${reason}` });
      await Notes.update(note);
      return res.status(204).json("");
    } else {
      return res.status(400).json({ message: "Заметка не отредактирована" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// Remove note
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!Number.isInteger(+req.params.id)) {
      return res.status(400).json("");
    }
    const note = await Notes.find(+req.params.id);
    if (note.owner === req.email) {
      return res.status(403).json({ message: "Заметка не удалена" });
    }
    if (note) {
      await Notes.delete(note);
      return res.status(204).json("");
    } else {
      return res.status(400).json({ message: "Заметка не удалена" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
