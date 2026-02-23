import express from 'express';
import {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    shareNote
} from '../controllers/notes.controller.js';

const router = express.Router();

router.post('/', createNote);
router.get('/', getNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/pin', togglePin);
router.patch('/:id/archive', toggleArchive);
router.post('/:id/share', shareNote);

export default router;
