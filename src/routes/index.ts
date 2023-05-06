import { Router, Request, Response } from 'express';
import { ERROR_CODE_404 } from '../utils/errors';

import userRouter from './users';
import cardRouter from './cards';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', (req: Request, res: Response) => {
  res.status(ERROR_CODE_404).send({ message: 'Такой страницы не существует' });
});

export default router;
