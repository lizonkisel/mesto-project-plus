import { Router, Request, Response } from 'express';

import userRouter from './users';
import cardRouter from './cards';
// import notFoundRouter from './not-found';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});
// router.use(notFoundRouter);

export default router;
