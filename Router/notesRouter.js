const express = require('express');
const router = express.Router();

const notesController = require('../Controllers/notesController');
const notesMiddleware = require('../Middlewares/notesMiddleware');
const authMiddleware = require('../Middlewares/authentication');

router.get('/', notesController.getAllNotes);

router.post('/', notesMiddleware.getNoteByTitle, notesController.addNote);

router.patch('/:noteId', authMiddleware.authenticateToken, notesMiddleware.getNote, notesController.isDeletedNote);

router.patch('/archive/:noteId', authMiddleware.authenticateToken, notesMiddleware.getNote, notesController.isArchivedNote);

router.patch('/update/:noteId', authMiddleware.authenticateToken, notesMiddleware.getNote, notesController.updateNote);

module.exports = router;