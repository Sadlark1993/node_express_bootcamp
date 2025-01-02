const fs = require('fs');
const http = require('http');
const url = require('url');

//it will run only once, so it can be sync
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  //console.log(req);
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    return res.end('This is the overview page.');
  }

  if (pathname === '/product') {
    if (typeof query.id !== 'undefined') {
      console.log('query: ');
      console.log(query);
      const product = query.id;
      return res.end(`This is the page of the product ${product}.`);
    }
  }

  if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    return res.end(data);
  }

  //404
  res.writeHead(404, {
    'Content-type': 'text/html',
    'my-own-header': 'hello-world',
  });
  res.end('<h1>404 page not found.</h1>');
});

server.listen(8000, () => {
  console.log('Listening to port 8000');
});
