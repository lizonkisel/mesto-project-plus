import { Router } from 'express';

import getNotFoundPage from '../controllers/not-found';

const router = Router();

router.all('/', getNotFoundPage);

export default router;
