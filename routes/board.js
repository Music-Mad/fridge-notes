import express from 'express';
import path from 'path';
const router = express.Router();

//Get dirname 
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'board.html'), (err) => {
        if (err) {
            console.error(err);
        }
    });
});


export default router;