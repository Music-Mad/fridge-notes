const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/room-code', (req, res) => {
    const code = req.body.roomCode; // Get email from form data
    
    // You can process the email here (save to database, send email, etc.)
    db.run(`
        INSERT INTO codes (code, name) VALUES (?, ?)`, [code, "testname"], function (error) {
            if (error) {
                console.error(error.message);
            }
            console.log(`Inserted a row with code: ${code}`);
        }
    );
    // Send response back to user
    let data = [];
    db.each(`SELECT * FROM codes`, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }

        data.push(row);
    });
 
    res.end();
});

module.exports = router;