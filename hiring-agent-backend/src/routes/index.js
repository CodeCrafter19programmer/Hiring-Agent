import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import jobRoutes from './jobRoutes.js';
import candidateRoutes from './candidateRoutes.js';
import screeningRoutes from './screeningRoutes.js';
import agentRoutes from './agentRoutes.js';
import workflowRoutes from './workflowRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/candidates', candidateRoutes);
router.use('/', screeningRoutes);
router.use('/agents', agentRoutes);
router.use('/workflows', workflowRoutes);

export default router;
