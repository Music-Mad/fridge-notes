import express from 'express';
import * as boardController from '../controllers/boardController.js'
const router = express.Router();

router.post('/board-code', (req, res) => {
    const code = req.body.boardCode; 
    //If room does not exist, create one
    let boardData = boardController.getBoard(code);
    if (typeof boardData == 'undefined') {
        boardController.createBoard(code);
        boardData = boardController.getBoard(code);
    }

    res.redirect(`/board?boardCode=${code}`);
});

export default router;