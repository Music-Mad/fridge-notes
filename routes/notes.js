import express from 'express';
import * as notesController from '../controllers/stickyNoteController.js'
const router = express.Router();


//create note API endpoint
router.post('/notes', (req, res) => {
    const {content, x_position, y_position, z_index, board_id} = req.body;
    const success = notesController.create(content, x_position, y_position, z_index, board_id);

    if (success) {
        res.json({ success: true, message: 'Created note' });
    } else {
        res.status(500).json({ success: false, message: 'Failed to create note'});
    }
});

//Get note by id API endpoint
router.get('/notes/:note_id', (req, res) => {
    const note = notesController.get(req.params.note_id);
    res.json({ success: true, note });
});

router.put('/notes/:note_id', (req, res) => {
    try {
        console.log('reached 1');
        const note_id = req.params.note_id;
                console.log(req.body);

        const { content, x_position, y_position, z_index, board_id} = req.body;
                console.log('reached 3');

        const status = notesController.update(note_id, {content, x_position, y_position, z_index, board_id});

        if (status = 400) {
            return res.status(400).json({
                success: false,
                message: 'no fields to update'
            });
        } else if (status = 404) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        } else if (status = 500) {
            return res.status(500).json({
                success: false,
                message: 'Unkown error'
            });
        } 

        res.json({
            success: true,
            message: 'Note updated successfully'
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}); 

export default router;