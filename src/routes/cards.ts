import { Router } from 'express';

import {
  getCards, postCard, deleteCard, putLike, deleteLike,
} from '../controllers/cards';

const router = Router();

router.get('/cards', getCards);
router.post('/', postCard);
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

export default router;
