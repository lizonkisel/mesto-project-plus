import { Router } from 'express';

import {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/', createUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;

// test user id: 644f79ff8f25c87ca85c585c
