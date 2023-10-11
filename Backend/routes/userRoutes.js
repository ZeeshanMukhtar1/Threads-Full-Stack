import express from 'express';
import UserController from '../controllers/userController.js'; // Importing UserController object

const router = express.Router();

router.post('/signup', UserController.signupUser); // Accessings signupUser from UserController object

export default router;
