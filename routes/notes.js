import express from 'express';
import * as notesController from '../controllers/stickyNoteController.js'
const router = express.Router();


//create note API endpoint
router.post('/notes', (req, res) => {
    const {content, x_position, y_position, z_index, board_id} = req.body;
    const success = notesController.createNote(content, x_position, y_position, z_index, board_id);

    if (success) {
        res.json({ success: true, message: 'Created note' });
    } else {
        res.status(500).json({ success: false, message: 'Failed to create note'});
    }
});

export default router;