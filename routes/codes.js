import express from 'express';
import * as boardController from '../controllers/boardController.js'
const router = express.Router();

router.post('/board-code', (req, res) => {
    const code = req.body.boardCode; 
    //If room does not exist, create one
    let boardData = boardController.get(code);
    if (typeof boardData == 'undefined') {
        boardController.create(code);
        boardData = boardController.get(code);
    }

    res.redirect(`/board?boardCode=${code}`);
});

export default router;