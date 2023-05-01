import { Router } from 'express';

import { getCards, postCard, deleteCard } from '../controllers/cards';

const router = Router();

router.get('/cards', getCards);
router.post('/', postCard);
router.delete('/:cardId', deleteCard);

export default router;
