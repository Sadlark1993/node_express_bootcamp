const fs = require('fs');
const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
  // solution 1: This will load the entire file in one variable and send to the client
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // solution 2: streams
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });

  // readable.on('end', () => {
  //   res.end();
  // });

  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('an error has occurred');
  // });

  // solution 3: readableSource.pipe(writeableDest)
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});

server.listen(8000, () => {
  console.log('listening to port 8000');
});
