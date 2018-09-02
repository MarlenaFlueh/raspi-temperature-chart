const http = require("http");
const app = require("./serverApp");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port);
