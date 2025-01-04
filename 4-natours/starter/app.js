import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//this middleware grant us access to the body of the incoming req
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
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

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
