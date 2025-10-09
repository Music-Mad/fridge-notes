import db from '../db/database.js';

function get(id) {
    try {
        const note = db.prepare(`SELECT * FROM sticky_notes WHERE id = ?`).get(id);
        //check if note exists to return proper status code
        if (note === undefined) {
            return { data: null, status: 404};
        }
        return { data: note, status: 200};
    } catch (error) {
        console.error(error.message);
        return { data: null, status: 500};
    }
};


function getFromBoardId(board_id) {
    try {
        const notes = db.prepare(`SELECT * FROM sticky_notes WHERE board_id = ?`).all(board_id);
        //check if notes is empty to return proper status code
        if (notes.length == 0) {
            return { data: null, status: 404};
        }
        return { data: notes, status: 200 };
    } catch (error) {
        console.error(error.message);
        return { data: null, status: 500 };
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

        //if request contained no updates
        if (fields.length === 0) {
            return { data: null, status: 400};
        }

        const info = db.prepare(`UPDATE sticky_notes SET ${fields.join(', ')} where id = ?`).run(...values);
        const note = get(note_id).data;

        //if note cannot be found
        if (info.changes === 0) {
            return {data: null, status: 404};
        }

        return { data: note, status: 200 };
    } catch (error) {
        return { data: null, status: 500};
    }
};

function create(content, x_position, y_position, z_index, board_id) {
    try {
        const info = db.prepare('INSERT INTO sticky_notes (board_id, content, x_position, y_position, z_index) VALUES (?, ?, ?, ?, ?)').run(board_id, content, x_position, y_position, z_index);
        const note = get(info.lastInsertRowid).data;
        return { data: note, status: 201};

    } catch (error) {
        console.error(error.message);
        return { data: null, status: 400};
    }
};

export {create, get, update, getFromBoardId};
