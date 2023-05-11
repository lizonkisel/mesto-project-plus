import { Router } from 'express';

import {
  getUsers, getUserById, getUserMe, updateProfile, updateAvatar,
} from '../controllers/users';
import {
  validateGetUserById, validateGetUserMe, validateUpdateProfile, validateUpdateAvatar,
} from '../middlewares/users-validation';

const router = Router();

router.get('/', getUsers);
router.get('/me', validateGetUserMe, getUserMe);
router.get('/:userId', validateGetUserById, getUserById);

router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

export default router;
