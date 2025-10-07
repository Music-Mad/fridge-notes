import express from 'express';
import * as notesController from '../controllers/stickyNoteController.js'
const router = express.Router();

//get notes by board id 
router.get('/notes/:board_id', (req, res) => {
    try {
        const notes = notesController.getNotesFromBoard(req.params.board_id);
        res.json({ success: true, notes });
    } catch (error) {
        res.status(500).json({sucess: false, message: error.message});
    }
}); 

export default router;