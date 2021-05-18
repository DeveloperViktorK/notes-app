const MAX_NOTE_LENGTH = 1000;

function checkNoteKeys(note) {
  let noteKeys = Object.keys(note);
  if (!noteKeys.includes("noteTitle") || !note.noteTitle)
    return { isValid: false, reason: "Отсутствует заголовок." };
  if (!noteKeys.includes("note") || !note.note)
    return { isValid: false, reason: "Заметка пустая." };
  return { isValid: true, reason: "" };
}

function checkNoteFieldsParams(note) {
  if (note.note.length > MAX_NOTE_LENGTH)
    return { isValid: false, reason: "Превышен максимальный размер заметки." };
  return { isValid: true, reason: "" };
}

module.exports = (note) => {
  let resValidation = checkNoteKeys(note);
  if (!resValidation.isValid) return resValidation;
  resValidation = checkNoteFieldsParams(note);
  if (!resValidation.isValid) return resValidation;
  return resValidation;
};
