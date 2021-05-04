import express from 'express';
import { authUser, registerUser } from '../controllers/authController.js';
const router = express.Router();

router.route('/register').post(authUser)
router.route('/login').post(registerUser)

export default router