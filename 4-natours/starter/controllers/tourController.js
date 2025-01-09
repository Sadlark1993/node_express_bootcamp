import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

export const checkId = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
    if (+val > tours.length) {
        return res.status(404).json({ status: 'failed', msg: 'Tour not found' });
    }
    next();
}

export const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({ status: 'fail', message: 'name and price properties are required!' });
    }
    next();
}

export const getAllTours = (req, res) => {
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

export const getTour = (req, res) => {
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

export const createTour = (req, res) => {
    //console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({ status: 'success', tour: newTour });
    });
};

export const updateTour = (req, res) => {
    const id = +req.params.id;
    const tour = tours.find((item) => item.id === id);
    if (!tour) {
        return res.status(404).json({ status: 'failed', msg: 'Tour not found' });
    }

    res.status(200).json({ status: 'success', tour: '<Updated tour here...>' });
};

export const deleteTour = (req, res) => {
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