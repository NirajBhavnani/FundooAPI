const Notes = require("../Models/notes");
const logger = require("../Utils/logger");

let notesController = {
  // FETCH ALL NOTES
  async getAllNotes(req, res) {
    try {
      const notes = await Notes.find();
      logger.verbose(
        `Status: ${res.statusCode}: Successfully fetched all notes`
      );
      return res.status(200).json(notes);
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error });
    }
  },

  //CREATE A NOTE
  async addNote(req, res) {
    const newNote = new Notes({
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    //   isArchived: req.body.isArchived,
    //   isDeleted: req.body.isDeleted,
    });

    console.log(newNote);

    if (res.note.length != 0) {
      logger.error("NOTE ALREADY EXISTS");
      res.status(422).json({ message: "Note Data already exists" }); //422 means Unprocessable
    } else {
      try {
        const addNote = await newNote.save(); //save returns a promise
        logger.verbose(
          `Status: ${res.statusCode}: Note registered successfully`
        );
        res.status(201).json(addNote); //201 means successfully created an object
      } catch (error) {
        logger.error(`Status: 400: ${error.message}`);
        res.status(400).json({ message: error }); //400 means something wrong with user-input not server
      }
    }
  },

//   isDeleted
async isDeletedNote(req, res) {
    
      res.note.isDeleted = true;
    
    try {
      const updatedNote = await res.note.save();
      res.json(updatedNote);
      logger.verbose(`Status: ${res.statusCode}: Note updated`);
    } catch (error) {
      logger.error(`Status: 400: ${error.message}`);
      res.status(400).json({ message: error });
    }
  },

//   isArchived
async isArchivedNote(req, res) {
    
      res.note.isArchived = true;
    
    try {
      const updatedNote = await res.note.save();
      res.json(updatedNote);
      logger.verbose(`Status: ${res.statusCode}: Note updated`);
    } catch (error) {
      logger.error(`Status: 400: ${error.message}`);
      res.status(400).json({ message: error });
    }
  },
};

module.exports = notesController;