import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500 } from '../utils/errors';
import Card from '../models/card';

const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.status(200).send({ data: cards });
  } catch (err) {
    return res.status(ERROR_CODE_500).send({ message: 'Произошла какая-то ошибка' });
  }
};

const postCard = async (req: Request, res: Response) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.body.user._id });
    return res.status(201).send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные в метод создания карточки' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const deleteCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId).orFail();
    return res.status(200).send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id карточки' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const putLike = async (req: Request, res: Response) => {
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
      return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id карточки' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const deleteLike = async (req: Request, res: Response) => {
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
      return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id карточки' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

export {
  getCards, postCard, deleteCard, putLike, deleteLike,
};
