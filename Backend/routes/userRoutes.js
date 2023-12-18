import express from 'express';
import UserController from '../controllers/userController.js'; // Importing UserController object
import protectRoute from '../middlewares/protectRoute.js';

// Initializing express router
const router = express.Router();

// Defining routes
router.get('/profile/:query', UserController.getUserProfile);
router.post('/signup', UserController.signupUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.post('/follow/:id', protectRoute, UserController.followUnfollowUser); // toggle follow/unfollow
// router.post('/update/:id', protectRoute, UserController.updateUser);
router.put('/update/:id', protectRoute, UserController.updateUser);

export default router;
