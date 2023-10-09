import Express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connetDB.js';

dotenv.config();

connectDB();

const app = Express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Open http://localhost:${PORT} to view it in the browser.`
  );
});

app.get('/', (req, res) => {
  res.json('Hello World!');
});
