import express from 'express';
import path from 'path';
import * as notesController from '../controllers/stickyNoteController.js';
import * as boardController from '../controllers/boardController.js'
const router = express.Router();

//Get dirname 
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/boards/:board_id/notes', (req, res) => {
    const {status, data} = notesController.getFromBoardId(req.params.board_id);
    res.status(status).json(data);
});

router.post('/boards/', (req, res) => {
    const code = req.body.boardCode; 
    //If room does not exist, create one
    let boardData = boardController.get(code);
    if (boardData.data == null) {
        boardController.create(code);
        boardData = boardController.get(code);
    }

    res.redirect(`/board?boardCode=${code}`);
});

export default router;