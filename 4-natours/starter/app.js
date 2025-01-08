import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// ############### MIDLEWARES #######################

app.use(morgan('dev'));

//this middleware grant us access to the body of the incoming req
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hallo from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ############### ROUTE HANDLERS #######################

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;

  const tour = tours.find((item) => item.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'failed', msg: 'Tour not found' });
  }

  res.status(200).json({
    status: 'success',
    tour,
  });
};

const createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({ status: 'success', tour: newTour });
  });
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((item) => item.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'failed', msg: 'Tour not found' });
  }

  res.status(200).json({ status: 'success', tour: '<Updated tour here...>' });
};

const deleteTour = (req, res) => {
  const id = +req.params.id;

  const tour = tours.find((item) => item.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'failed', msg: 'Tour not found' });
  }

  res.status(204).json({
    status: 'success',
    message: 'tour deleted',
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route under development yet.',
  });
};

// ############### ROUTES #######################

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
