//  Import the HTTP node module 
const http = require('http');

// Create the HTTp Sever
const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<h1>Hello, Node.js HTTp Server!<h1>');
    res.end();
});

// Specify the port to listen on
const port = 3000;

// Start the server
server.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`)
});