//  IMPORTS 
const express = require('express');
const path = require('path');
const codeRoutes = require('./routes/codes.js');
const app = express();


app.use(express.urlencoded({ extended: true}));
app.use(express.static('view'));

app.use('/', codeRoutes);



//start server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})