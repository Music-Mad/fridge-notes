import express from 'express';
import path from 'path';
import * as notesController from '../controllers/stickyNoteController';
const router = express.Router();

//Get dirname 
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/boards/:board_id/notes', (req, res) => {
    const notes = notesController.getNotesFromBoardId(req.params.board_id);
    res.json({ success: true, notes });
});

export default router;