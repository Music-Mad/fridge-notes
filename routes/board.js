const express = require('express');
const path = require('path');
const db = require('../db/database.js');
const router = express.Router();

router.get('/board', (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'views', 'board.html'), (err) => {
        if (err) {
            console.error(err);
        }
    });

});


module.exports = router;