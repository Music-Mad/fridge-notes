const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/room-code', (req, res) => {
    const code = req.body.roomCode; // Get email from form data
    
    // You can process the email here (save to database, send email, etc.)
    info = db.prepare(`INSERT INTO codes (code, name) VALUES (?, ?)`).run(code, 'testname');
    console.log(info.lastInsertRowid);
 
    res.end();
});

module.exports = router;