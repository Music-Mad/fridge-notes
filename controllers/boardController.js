import db from '../db/database.js';

function get(boardCode) {
    try {
        const board = db.prepare(`SELECT * FROM boards WHERE id = ?`).get(boardCode);
        //check if data is empty for proper status handling
        if (board === undefined) {
            return {status: 404, data: null};
        }
        return {status: 200, data: board};
    } catch (error) {
        console.error(error.message);
        return {status: 500, data: null};
    }
};

function create(boardCode) {
    try {
        const info = db.prepare(`INSERT INTO boards (id) VALUES (?)`).run(boardCode);
        const board = get(info.lastInsertRowid);
        return {status: 201, data: board}
    } catch (error) {
        console.error(error.message);
        return {status: 500, data: null};
    }
};


export { create, get };