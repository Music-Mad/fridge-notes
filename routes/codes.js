const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/database.js');

router.post('/board-code', (req, res) => {
    const code = req.body.boardCode; 
    const username = req.body.username;

    //If room does not exist, create one
    roomData = db.prepare(`SELECT * FROM boards WHERE id = ?`).get(code);
    if (typeof roomData == 'undefined') {
        info = db.prepare(`INSERT INTO boards (id, username) VALUES (?, ?)`).run(code, username);
        data = db.prepare(`SELECT * FROM boards`).all();
    }
    
    res.redirect(`/board?boardCode=${code}&username=${username}`);

});

module.exports = router;