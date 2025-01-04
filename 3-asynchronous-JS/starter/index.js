const fs = require('fs');
const superagt = require('superagent');

// ########################### CALLBACK HELL ##################################
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

// ########################### PROMISES ##################################
// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       //the reject sends the data to catch() method
//       if (err) reject({ message: 'readFile: Not found' });

//       // the resolve sends the data to then() method
//       resolve(data);
//     });
//   });
// };

// const writeFilePro = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//       if (err) reject({ message: 'writefile: Not found' });
//       resolve({ message: 'done' });
//     });
//   });
// };

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagt.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((data) => {
//     console.log(data.body.message);
//     return writeFilePro(`${__dirname}/dog-img.txt`, data.body.message);
//   })
//   .then(() => {
//     console.log('Random image saved to file!');
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });

// ########################### ASYNC AWAIT ##################################
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

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagt.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
    console.log('Random image saved to file!');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return '2: Async func finished runing';
};

// handling async return
(async () => {
  try {
    console.log('1: will run the async func');
    const x = await getDogPic();
    console.log(x);
    console.log('Done');
  } catch (err) {
    console.log('ERROR');
  }
})();

// __________ Using then/catch to handle async returns ____________
/* console.log('1: will run the async func');
getDogPic().then((x) => {
  console.log(x);
  console.log('3: done');
}).catch(err){
  console.log('ERROR')
};*/

console.log('4: this step will execute right after the 1st because its not blocking');
