import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as Jobs from '../controllers/jobController.js';
import { JobCreateSchema, JobUpdateSchema, JobIdParam } from '../models/jobModel.js';

const router = Router();

router.get('/', asyncHandler(Jobs.list));
router.get('/:id', validate(JobIdParam), asyncHandler(Jobs.get));

router.post('/', authenticate, authorize('admin', 'recruiter'), validate(JobCreateSchema), asyncHandler(Jobs.create));
router.put('/:id', authenticate, authorize('admin', 'recruiter'), validate(JobUpdateSchema), asyncHandler(Jobs.update));
router.delete('/:id', authenticate, authorize('admin', 'recruiter'), validate(JobIdParam), asyncHandler(Jobs.remove));

export default router;
