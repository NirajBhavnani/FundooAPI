const Notes = require("../Models/notes");
const logger = require("../Utils/logger");

let notesMiddleware = {
  async getNote(req, res, next) {
    //next: if we call this move on to the next section of code
    let note;
    try {
      note = await Notes.findById(req.params.noteId);
      if (note == null) {
        logger.error(`Status: 404: note not found`);
        return res.status(404).json({ message: "Could not find note" }); //404: Could not find anything
      }
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error }); //500: Something wrong with server
    }
    res.note = note;
    next();
  },

  async getNoteByTitle(req, res, next) {
    let note;
    try {
      note = await Notes.find({ title: req.body.title });
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }

    res.note = note;
    next();
  },
};

module.exports = notesMiddleware;
