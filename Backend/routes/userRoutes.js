import express from 'express';
import UserController from '../controllers/userController.js'; // Importing UserController object
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/signup', UserController.signupUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.post('/follow/:id', protectRoute, UserController.followUnfollowUser);

export default router;
