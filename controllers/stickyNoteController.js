import db from '../db/database.js';

function get(id) {
    try {
        const note = db.prepare(`SELECT * FROM sticky_notes WHERE id = ?`).get(id);
        //check if note exists to return proper status code
        if (note === undefined) {
            return { status: 404, data: null};
        }
        return { status: 200, data: note};
    } catch (error) {
        console.error(error.message);
        return { status: 500, data: null};
    }
};


function getFromBoardId(board_id) {
    try {
        const notes = db.prepare(`SELECT * FROM sticky_notes WHERE board_id = ?`).all(board_id);
        //check if notes is empty to return proper status code
        if (notes.length == 0) {
            return { status: 404, data: null };
        }
        return { status: 200, data: notes};
    } catch (error) {
        console.error(error.message);
        return { status: 500, data: null};
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
            return { status: 400, data: null};
        }

        const info = db.prepare(`UPDATE sticky_notes SET ${fields.join(', ')} where id = ?`).run(...values);
        const note = get(note_id).data;

        //if note cannot be found
        if (info.changes === 0) {
            return { status: 404, data: null};
        }

        return { status: 200, data: note};
    } catch (error) {
        return { status: 500, data: null };
    }
};

function create(content, x_position, y_position, z_index, board_id) {
    try {
        const info = db.prepare('INSERT INTO sticky_notes (board_id, content, x_position, y_position, z_index) VALUES (?, ?, ?, ?, ?)').run(board_id, content, x_position, y_position, z_index);
        const note = get(info.lastInsertRowid).data;
        return { status: 201, data: note};

    } catch (error) {
        console.error(error.message);
        return { status: 400, data: null };
    }
};

function remove(note_id) {
    try {
        const note = get(note_id);
        console.log(note);
        const info = db.prepare(`DELETE FROM sticky_notes WHERE id = ?`).run(note_id);
        return { status: 204, data: null };
    } catch (error) {
        console.error(error.message);
        return { status: 500, data: null };
    }
};

export {create, get, update, remove, getFromBoardId};
