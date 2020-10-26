const http = require('http');
const app = require('./app/index');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);