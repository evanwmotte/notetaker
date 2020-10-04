class Note {
    constructor(title, text, id) {
      this.title = title;
      this.text = text;
      Note.lastId++;
      this.id = Note.lastId;
    }
  }

  Note.lastId = 0;

  module.exports = Note;