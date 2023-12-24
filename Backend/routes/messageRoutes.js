import express from 'express';
//  adding .js is very important here
import protectRoute from '../middlewares/protectRoute.js';
import {
  GetConversations,
  GetMessages,
  sendMessage,
} from '../controllers/messageController.js';
const router = express.Router();
router.get('/conversations', protectRoute, GetConversations);
router.get('/:otherUserId', protectRoute, GetMessages);
router.post('/', protectRoute, sendMessage);

export default router;
