import { Pool } from 'pg';

const connectionString = process.env.DB_CON;
const db = new Pool({
  connectionString,
});
export default db;
