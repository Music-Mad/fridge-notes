const express = require('express');
const router = express.Router();

router.post('/room-code', (req, res) => {
    const code = req.body.roomCode; // Get email from form data
    
    // You can process the email here (save to database, send email, etc.)
    
    // Send response back to user
    res.send(`Room Code: ${code}`);
    res.end();
});

module.exports = router;