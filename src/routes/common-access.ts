import { Router } from 'express';

import { login, createUser } from '../controllers/users';
import {
  validateCreateUser, validateLogin,
} from '../middlewares/users-validation';

const router = Router();

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

export default router;
