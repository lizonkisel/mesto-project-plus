import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Card from '../models/card';
import BadRequestError from '../errors/bad-request-err';
import UnauthorizedError from '../errors/unauthorized-err';
import NotFoundError from '../errors/not-found-err';

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.status(200).send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

const postCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.body.user._id });
    return res.status(201).send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные в метод создания карточки'));
    }
    return next(err);
    // return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail();
    const cardOwner = card.owner;
    const currentUserId = req.body.user._id;
    if (cardOwner == currentUserId) {
      const deletableCard = await Card.findByIdAndRemove(req.params.cardId).orFail();
      return res.status(200).send({ data: deletableCard });
    }
    return next(new UnauthorizedError('Нельзя удалить карточку другого пользователя'));
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError('Карточка не найдена'));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Передан невалидный id карточки'));
    }
    return next(err);
  }
};

// const deleteCard = async (req: Request, res: Response) => {
//   try {
//     const card = await Card.findByIdAndRemove(req.params.cardId).orFail();
//     return res.status(200).send({ data: card });
//   } catch (err) {
//     if (err instanceof mongoose.Error.DocumentNotFoundError) {
//       return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
//     }
//     if (err instanceof mongoose.Error.CastError) {
//       return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id карточки' });
//     }
//     return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
//   }
// };

const putLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.body.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .orFail();
    return res.status(200).send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError('Карточка не найдена'));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Передан невалидный id карточки'));
    }
    return next(err);
  }
};

const deleteLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.body.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .orFail();
    return res.status(200).send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError('Карточка не найдена'));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Передан невалидный id карточки'));
    }
    return next(err);
  }
};

export {
  getCards, postCard, deleteCard, putLike, deleteLike,
};
