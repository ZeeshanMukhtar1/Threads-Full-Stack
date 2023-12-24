import express from 'express';
//  adding .js is very important here
import protectRoute from '../middlewares/protectRoute.js';
import { sendMessage } from '../controllers/messageController.js';
const router = express.Router();
router.post('/', protectRoute, sendMessage);

export default router;
