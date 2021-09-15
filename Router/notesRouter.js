const express = require('express');
const router = express.Router();

const notesController = require('../Controllers/notesController');
const notesMiddleware = require('../Middlewares/notesMiddleware');
const authMiddleware = require('../Middlewares/authentication');

// Authentication of logged in user token
router.use(authMiddleware.authenticateToken); //Single line can be used instead of writing in every function

// FETCH ALL NOTES
router.get('/', notesController.getAllNotes);

// CREATE NEW NOTE
router.post('/', notesMiddleware.getNoteByTitle, notesController.addNote);

// DELETE NOTE
router.patch('/delete/:noteId', notesMiddleware.getNote, notesController.isDeletedNote);

// ARCHIVE NOTE
router.patch('/archive/:noteId', notesMiddleware.getNote, notesController.isArchivedNote);

// UPDATE NOTE
router.patch('/update/:noteId', notesMiddleware.getNote, notesController.updateNote);

// GET ALL DELETED
router.get('/trash', notesController.getAllDeletedNotes);

// GET ALL ARCHIVED
router.get('/archive', notesController.getAllArchivedNotes);

module.exports = router;