import db from '../db/database.js';

function create(content, x_position, y_position, z_index, board_id) {
    try {
        const info = db.prepare('INSERT INTO sticky_notes (board_id, content, x_position, y_position, z_index) VALUES (?, ?, ?, ?, ?)').run(board_id, content, x_position, y_position, z_index);
        return info.lastInsertRowid;
    } catch (error) {
        console.error(error.message);
        return -1;
    }
};

function update(note_id, { content, x_position, y_position, z_index, board_id } = {}) {
    try {
        //For each param that is valid, add the item to values and the appropriate 'field' statement for the sql update
        const fields = [];
        const values = [];

        if (content !== undefined) {
            fields.push('content = ?');
            values.push(content);
        }
        if (x_position !== undefined)
        {
            fields.push('x_position = ?');
            values.push(x_position);
        }
        if (y_position !== undefined) {
            fields.push('y_position = ?');
            values.push(y_position);
        } 
        if (z_index !== undefined) {
            fields.push('z_index = ?');
            values.push(z_index);
        } 
        if (board_id !== undefined) {
            fields.push('board_id = ?');
            values.push(board_id);
        }
        values.push(note_id);

        
        if (fields.length === 0) {
            return 400;
        }

        const info = db.prepare(`UPDATE sticky_notes SET ${fields.join(', ')} where id = ?`).run(...values);

        if (info.changes === 0) {
            return 404;
        }

        return 200;
    } catch (error) {
        return 500;
    }
};

function get(id) {
    try {
        const data = db.prepare(`SELECT * FROM sticky_notes WHERE id = ?`).get(id);
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};


function getFromBoardId(board_id) {
    try {
        const data = db.prepare(`SELECT * FROM sticky_notes WHERE board_id = ?`).all(board_id);
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export {create, get, update, getFromBoardId};
