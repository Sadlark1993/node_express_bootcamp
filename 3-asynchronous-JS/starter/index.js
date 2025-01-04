const fs = require('fs');
const superagt = require('superagent');

// callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagt.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, result) => {
//     if (err) return console.error(err.message);
//     console.log(result.body.message);
//     fs.writeFile('dog-img.txt', result.body.message, (err) => {
//       console.log('Random dog image saved to file.');
//     });
//   });
// });

// promisses
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      //the reject sends the data to catch() method
      if (err) reject({ message: 'readFile: Not found' });

      // the resolve sends the data to then() method
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject({ message: 'writefile: Not found' });
      resolve({ message: 'done' });
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagt.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((data) => {
    console.log(data.body.message);
    return writeFilePro(`${__dirname}/dog-img.txt`, data.body.message);
  })
  .then(() => {
    console.log('Random image saved to file!');
  })
  .catch((err) => {
    console.error(err.message);
  });
