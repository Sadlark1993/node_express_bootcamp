const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  //console.log(req);
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview page.');
  } else if (pathName === '/product') {
    res.end('This is the product page.');
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>404 page not found.</h1>');
  }
});

server.listen(8000, () => {
  console.log('Listening to port 8000');
});
