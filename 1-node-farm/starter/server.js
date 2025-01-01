const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  //console.log(req);
  res.end('Hello from the server!');
});

server.listen(8000, () => {
  console.log('Listening to port 8000');
});
