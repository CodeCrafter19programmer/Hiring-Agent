import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as Screening from '../controllers/screeningController.js';

const router = Router();

router.post('/screen-candidates', authenticate, authorize('admin'), asyncHandler(Screening.triggerScreening));

export default router;
