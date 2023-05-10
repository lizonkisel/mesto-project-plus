import { Router } from 'express';

import {
  getUsers, getUser, updateProfile, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
// router.post('/', createUser);
// router.post('/signin', login);
// router.post('/signup', createUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;

// test user id: 644f79ff8f25c87ca85c585c
