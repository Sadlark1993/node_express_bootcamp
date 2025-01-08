import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

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

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;