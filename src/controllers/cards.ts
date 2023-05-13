import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

import IRequest from '../types';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request-err';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden-err';

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.status(200).send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

const postCard = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user?._id });
    return res.status(201).send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные в метод создания карточки'));
    }
    return next(err);
  }
};

const deleteCard = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail();
    const cardOwner = card.owner;
    const currentUserId = req.user?._id;
    // eslint-disable-next-line eqeqeq
    if (cardOwner == currentUserId) {
      const deletableCard = await Card.findByIdAndRemove(req.params.cardId).orFail();
      return res.status(200).send({ data: deletableCard });
    }
    return next(new ForbiddenError('Нельзя удалить карточку другого пользователя'));
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

const putLike = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
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

const deleteLike = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id as JwtPayload } },
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
