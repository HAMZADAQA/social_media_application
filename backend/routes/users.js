import express from 'express';
import { deleteUser, updateUser, getUser, followUser, unfollowUser, getFriends } from '../controllers/usersController.js';
const router = express.Router();

router.route('/:id').put(updateUser)
router.route('/:id').delete(deleteUser)
router.route('/').get(getUser)
router.route('/friends/:userId').get(getFriends)
router.route('/:id/follow').put(followUser)
router.route('/:id/unfollow').put(unfollowUser)

export default router