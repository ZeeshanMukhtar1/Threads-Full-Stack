//  Entry point for backend
// importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connetDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

import { v2 as cloudinary } from 'cloudinary';

// loading env variables
dotenv.config();

// connecting to database
connectDB();

// initializing express app
const app = express();

// defining port
const PORT = process.env.PORT || 5000;

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: '50mb' })); // to parse json data from request body
app.use(express.urlencoded({ extended: true })); // to parse url encoded data from request body

// to parse cookies from request
app.use(cookieParser());

// Route prefix
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);

// listening to port
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Open http://localhost:${PORT} to view it in the browser.`
  );
});
