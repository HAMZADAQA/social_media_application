import express from 'express';
import { addPost, getMessage } from '../controllers/messagesController.js';
const router = express.Router();

router.route('/').post(addPost);
router.route('/:conversationId').get(getMessage);

export default router;
