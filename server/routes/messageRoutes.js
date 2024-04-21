import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import {
  getMessages,
  sendMessage,
  getConversations,
  deleteChat,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/conversations', protectRoute, getConversations);
router.get('/:otherUserId', protectRoute, getMessages);
router.post('/', protectRoute, sendMessage);
router.delete('/chat/:conversationId', protectRoute, deleteChat);

export default router;
