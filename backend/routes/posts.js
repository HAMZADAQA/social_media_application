import express from 'express';
import { createPost, updatePost, deletePost, likePost, getPost, timelineposts, usersPosts} from '../controllers/postsController.js';
const router = express.Router();

router.route('/').post(createPost)
router.route('/:id').put(updatePost).delete(deletePost).get(getPost)
router.route('/:id/like').put(likePost)
router.route('/timeline/:userId').get(timelineposts)
router.route('/profile/:username').get(usersPosts)
// router.route('/:id/follow').put(followUser)
// router.route('/:id/unfollow').put(unfollowUser)

export default router