import express from 'express';
import * as notesController from '../controllers/stickyNoteController.js'
const router = express.Router();

//Get note by id API endpoint
router.get('/notes/:note_id', (req, res) => {
    const { status, data } = notesController.get(req.params.note_id);
    res.status(status).json(data);
});

//create note API endpoint
router.post('/notes', (req, res) => {
    const {canvas, color, x_position, y_position, width, height, z_index, board_id} = req.body;
    const { status, data} = notesController.create(canvas, color, x_position, y_position, width, height, z_index, board_id);
    res.status(status).json(data);
});

router.put('/notes/:note_id', (req, res) => {
    try {
        const note_id = req.params.note_id;
        const { canvas, color, x_position, y_position, width, height, z_index, board_id} = req.body;
        
        const {status, data} = notesController.update(note_id, {canvas, color, x_position, y_position, width, height, z_index, board_id});

        if (status == 400) {
            return res.status(400).json({
                message: 'no fields to update'
            });
        } else if (status == 404) {
            return res.status(404).json({
                message: 'Note not found'
            });
        } else if (status == 500) {
            return res.status(500).json({
                message: 'Unkown error'
            });
        } 
    
        res.status(status).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}); 

router.delete('/notes/:note_id', (req, res) => {
    const { status, data } = notesController.remove(req.params.note_id);
    res.status(status).json(data);
});

export default router;