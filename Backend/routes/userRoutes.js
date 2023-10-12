import express from 'express';
import UserController from '../controllers/userController.js'; // Importing UserController object

const router = express.Router();

router.post('/signup', UserController.signupUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);

export default router;
