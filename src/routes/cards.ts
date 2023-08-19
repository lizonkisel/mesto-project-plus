import { Router } from 'express';

import {
  getCards, postCard, deleteCard, putLike, deleteLike,
} from '../controllers/cards';

import {
  validatePostCard, validateDeleteCard, validatePutLike, validateDeleteLike,
} from '../middlewares/cards-validation';

const router = Router();

router.get('/', getCards);
router.post('/', validatePostCard, postCard);
router.delete('/:cardId', validateDeleteCard, deleteCard);

router.put('/:cardId/likes', validatePutLike, putLike);
router.delete('/:cardId/likes', validateDeleteLike, deleteLike);

export default router;
