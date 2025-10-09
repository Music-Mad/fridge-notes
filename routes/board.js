import express from 'express';
import path from 'path';
import * as notesController from '../controllers/stickyNoteController.js';
const router = express.Router();

//Get dirname 
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/boards/:board_id/notes', (req, res) => {
    const {status, data} = notesController.getFromBoardId(req.params.board_id);
    res.status(status).json(data);
});

export default router;