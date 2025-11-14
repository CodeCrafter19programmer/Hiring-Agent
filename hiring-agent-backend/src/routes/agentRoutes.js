import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as Agents from '../controllers/agentController.js';
import { AgentCreateSchema, AgentUpdateSchema, AgentIdParam } from '../models/agentModel.js';

const router = Router();

router.get('/', asyncHandler(Agents.list));
router.get('/:id', validate(AgentIdParam), asyncHandler(Agents.get));

router.post('/', authenticate, authorize('Admin', 'Recruiter'), validate(AgentCreateSchema), asyncHandler(Agents.create));
router.patch('/:id', authenticate, authorize('Admin', 'Recruiter'), validate(AgentUpdateSchema), asyncHandler(Agents.update));
router.delete('/:id', authenticate, authorize('Admin', 'Recruiter'), validate(AgentIdParam), asyncHandler(Agents.remove));

export default router;
