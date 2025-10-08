import db from '../db/database.js';

function createNote(content, x_position, y_position, z_index, board_id) {
    try {
        const info = db.prepare('INSERT INTO sticky_notes (board_id, content, x_position, y_position, z_index) VALUES (?, ?, ?, ?, ?)').run(board_id, content, x_position, y_position, z_index);
        return info.lastInsertRowid;
    } catch (error) {
        console.error(error.message);
        return -1;
    }
};

function getNote(id) {
    try {
        const data = db.prepare(`SELECT * FROM sticky_notes WHERE id = ?`).get(id);
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};


function getNotesFromBoardId(board_id) {
    try {
        const data = db.prepare(`SELECT * FROM sticky_notes WHERE board_id = ?`).all(board_id);
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export {createNote, getNote, getNotesFromBoardId};
