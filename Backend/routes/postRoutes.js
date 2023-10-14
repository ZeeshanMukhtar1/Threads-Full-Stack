import express from 'express';
import postController from '../controllers/postController.js'; // importing post controller
import protectRoute from '../middlewares/protectRoute.js';

// Initializing express router
const router = express.Router();

// Defining routes
router.get('/:id', postController.getPost);
router.post('/create', protectRoute, postController.createPost);

export default router;
