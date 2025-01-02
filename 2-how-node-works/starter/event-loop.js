const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
//process.env.UV_THREADPOOL_SIZE = 5;
setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('_____________________________________________');
  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setTimeout(() => console.log('Timer 4 finished'), 0);
  setImmediate(() => console.log('Immediate 1 finished'));
  console.log('test');
  process.nextTick(() => console.log('Process.nextTick'));

  /* this processes will be automatically sent to the thread pool to be executed async, because it is too heavy.  But the thread pool initially has only 4 threads, so que 5th will have to wait.
  You can change the number of threads by process.env.UV_THREADPOOL_SIZE = 5*/
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
});

console.log('Hallo from the top-level code');
