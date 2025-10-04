import db from '../db/database.js';

function createBoard(boardCode) {
    try {
        const info = db.prepare(`INSERT INTO boards (id) VALUES (?)`).run(boardCode);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

function getBoard(boardCode) {
    try {
        const roomData = db.prepare(`SELECT * FROM boards WHERE id = ?`).get(boardCode);
        return(roomData);
    } catch (error) {
        console.error(error.message);
        return(null);
    }
};

export { createBoard, getBoard };