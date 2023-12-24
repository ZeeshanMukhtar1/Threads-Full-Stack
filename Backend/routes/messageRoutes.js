import express from 'express';
//  adding .js is very important here
import protectRoute from '../middlewares/protectRoute.js';
import {
  getConversations,
  GetMessages,
  sendMessage,
} from '../controllers/messageController.js';
const router = express.Router();
router.get('/conversations', protectRoute, getConversations);
router.get('/:otherUserId', protectRoute, GetMessages);
router.post('/', protectRoute, sendMessage);

export default router;
