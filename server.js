//  IMPORTS 
const express = require('express');
const path = require('path');
const app = express();


app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/codes.js'));
app.use('/', require('./routes/board.js'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


//start server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})