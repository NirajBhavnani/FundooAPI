const express = require('express');
const router = express.Router();

const notesController = require('../Controllers/notesController');
const notesMiddleware = require('../Middlewares/notesMiddleware');
const authMiddleware = require('../Middlewares/authentication');

router.use(authMiddleware.authenticateToken); //Single line can be used instead of writing in every function

router.get('/', notesController.getAllNotes);

router.post('/', notesMiddleware.getNoteByTitle, notesController.addNote);

router.patch('/:noteId', notesMiddleware.getNote, notesController.isDeletedNote);

router.patch('/archive/:noteId', notesMiddleware.getNote, notesController.isArchivedNote);

router.patch('/update/:noteId', notesMiddleware.getNote, notesController.updateNote);

module.exports = router;