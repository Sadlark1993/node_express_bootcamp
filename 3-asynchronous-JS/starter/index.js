const fs = require('fs');
const superagt = require('superagent');

// callback hell
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagt.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, result) => {
    if (err) return console.error(err.message);
    console.log(result.body.message);
    fs.writeFile('dog-img.txt', result.body.message, (err) => {
      console.log('Random dog image saved to file.');
    });
  });
});
