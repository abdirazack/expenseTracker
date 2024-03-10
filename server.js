const http = require('http');

require('dotenv').config(); // Load environment variables from .env file


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world!');
});

const port = process.env.PORT || 3000; // Use the port from the environment file or fallback to 3000
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});