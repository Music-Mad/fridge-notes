//  IMPORTS 
const express = require('express');
const path = require('path');
const codeRoutes = require('./routes/codes');
const app = express();


app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use('/', codeRoutes);

//serve html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'))
});



//start server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})