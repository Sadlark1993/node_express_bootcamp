import { config } from 'dotenv';
config();
import app from './app.js';

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
