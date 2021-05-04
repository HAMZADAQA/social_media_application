import express from 'express';
import { createnewConversation, getTwouserId, getUserConversation } from '../controllers/conversationsController.js';
const router = express.Router();

router.route('/').post(createnewConversation)
router.route('/find/:firstUserId/:secondUserId').get(getTwouserId)
router.route('/:userId').get(getUserConversation)
export default router;
