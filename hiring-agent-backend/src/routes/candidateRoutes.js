import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as Candidates from '../controllers/candidateController.js';

const router = Router();

router.get('/', authenticate, asyncHandler(Candidates.list));
router.get('/stats', authenticate, asyncHandler(Candidates.stats));

export default router;
