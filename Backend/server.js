//  Entry point for backend
// importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connetDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

// loading env variables
dotenv.config();

// connecting to database
connectDB();

// initializing express app
const app = express();

// defining port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json()); // to parse json data from request body
app.use(express.urlencoded({ extended: true })); // to parse url encoded data from request body

// to parse cookies from request
app.use(cookieParser());

// Route prefix
app.use('/api/users', userRoutes);

// listening to port
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Open http://localhost:${PORT} to view it in the browser.`
  );
});
