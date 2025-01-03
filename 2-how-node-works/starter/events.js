const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();

// creating event listeners
myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

myEmitter.on('newSale', (obj) => {
  console.log(`Costumer name: ${obj.costumer}`);
});

myEmitter.on('newSale', (obj) => {
  console.log(`There are ${obj.stock} items left in stock`);
});

// emiting event
myEmitter.emit('newSale', { costumer: 'John', stock: 9 });

// ##################### ANOTHER EVENT LISTENER ########################
// This kind of obj is a inheritance from the EventEmitter() class:

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received!');
  res.end('Request received');
});

server.on('request', (req, res) => {
  console.log('another request');
});

server.on('close', () => {
  console.log('server is closed');
});

server.listen(8000, () => {
  console.log('Awaiting requests...');
});
