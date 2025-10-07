//  IMPORTS 
import express from 'express';
import codesRouter from './routes/codes.js';
import notesRouter from './routes/notes.js';

const app = express();

//Get dirname for project
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mount route handlers
app.use('/api', codesRouter);
app.use('/api', notesRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'board.html'), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

//start server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
