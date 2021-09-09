const express = require('express');
const router = express.Router();

const notesController = require('../Controllers/notesController');
const notesMiddleware = require('../Middlewares/notesMiddleware');

router.get('/', notesController.getAllNotes);

router.post('/', notesMiddleware.getNoteByTitle, notesController.addNote);

router.patch('/:noteId', notesMiddleware.getNote, notesController.isDeletedNote);

router.patch('/archive/:noteId', notesMiddleware.getNote, notesController.isArchivedNote);

module.exports = router;