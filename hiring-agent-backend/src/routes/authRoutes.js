import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as AuthController from '../controllers/authController.js';
import { RegisterSchema, LoginSchema } from '../models/userModel.js';

const router = Router();

router.post('/login', validate(LoginSchema), asyncHandler(AuthController.login));
router.post('/logout', authenticate, asyncHandler(AuthController.logout));
router.get('/me', authenticate, asyncHandler(AuthController.me));

export default router;
