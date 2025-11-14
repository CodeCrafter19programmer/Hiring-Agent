import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as Workflows from '../controllers/workflowController.js';
import { TriggerWorkflowSchema, LogIdParam, UpdateLogSchema } from '../models/workflowModel.js';

const router = Router();

router.post('/trigger', authenticate, authorize('Admin', 'Recruiter'), validate(TriggerWorkflowSchema), asyncHandler(Workflows.trigger));
router.get('/logs', authenticate, authorize('Admin', 'Recruiter'), asyncHandler(Workflows.listLogs));
router.get('/logs/:id', authenticate, authorize('Admin', 'Recruiter'), validate(LogIdParam), asyncHandler(Workflows.getLog));
router.patch('/logs/:id', authenticate, authorize('Admin'), validate(UpdateLogSchema), asyncHandler(Workflows.updateLog));

export default router;
