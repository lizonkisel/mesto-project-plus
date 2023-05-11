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
// router.post('/', createUser);
// router.post('/signin', login);
// router.post('/signup', createUser);

router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

export default router;

// test user id: 644f79ff8f25c87ca85c585c
