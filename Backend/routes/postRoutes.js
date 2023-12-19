import express from 'express';
import postController from '../controllers/postController.js'; // importing post controller
import protectRoute from '../middlewares/protectRoute.js';

// Initializing express router
const router = express.Router();

// Defining routes
router.get('/feed', protectRoute, postController.getFeedPosts);
router.get('/:id', postController.getPost);
router.get('/user/:username', postController.getUserPosts);
router.post('/create', protectRoute, postController.createPost);
router.delete('/:id', protectRoute, postController.deletePost);
router.put('/like/:id', protectRoute, postController.likeUnlikePost); // if u dont have an account then u cant like or unlike a post
router.put('/reply/:id', protectRoute, postController.replyToPost); // if u dont have an account then u cant reply to a post

export default router;
