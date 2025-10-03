const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/room-code', (req, res) => {
    const code = req.body.roomCode; 
    const username = req.body.username;

    //If room does not exist, create one
    roomData = db.prepare(`SELECT * FROM rooms WHERE code = ?`).get(code);
    if (typeof roomData == 'undefined') {
        info = db.prepare(`INSERT INTO rooms (code, username) VALUES (?, ?)`).run(code, username);
        data = db.prepare(`SELECT * FROM rooms`).all();
        res.send(data);
    }
    

 
    res.end();
});

module.exports = router;