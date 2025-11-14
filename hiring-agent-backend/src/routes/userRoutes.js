import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as Users from '../controllers/userController.js';
import { UpdateRoleSchema } from '../models/userModel.js';

const router = Router();

router.use(authenticate);

router.get('/', authorize('Admin'), asyncHandler(Users.list));
router.get('/:id', authorize('Admin'), asyncHandler(Users.get));
router.patch('/:id/role', authorize('Admin'), validate(UpdateRoleSchema), asyncHandler(Users.updateRole));
router.delete('/:id', authorize('Admin'), asyncHandler(Users.remove));

export default router;
