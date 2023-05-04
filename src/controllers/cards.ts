import { Request, Response } from 'express';

import { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500 } from '../utils/errors';
import Card from '../models/card';
import checkExistenceOfUser from '../utils/utils';

const getCards = (req: Request, res: Response) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

const postCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;

  if (!name || !link) {
    return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные в метод создания карточки' });
  }

  if (!req.body.user) {
    return res.status(ERROR_CODE_400).send({ message: 'Не передан id автора' });
  }

  const id = req.body.user._id; // Временное решение, чтобы получить доступ к _id автора,
  // который не передаётся в запросе

  if (!id) {
    return res.status(ERROR_CODE_400).send({ message: 'Не передан id автора' });
  }

  try {
    const owner = await checkExistenceOfUser(id);
    if (owner === null) {
      return res.status(ERROR_CODE_404).send({ message: 'Невозможно создать карточку за авторством несуществующего пользователя' });
    }
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id автора' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }

  return Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

const deleteCard = (req: Request, res: Response) => {
  if (!req.params.cardId) {
    return res.status(ERROR_CODE_400).send({ message: 'Не передан id карточки' });
  }

  return Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id карточки' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
    });
};

const putLike = async (req: Request, res: Response) => {
  if (!req.params.cardId) {
    return res.status(ERROR_CODE_400).send({ message: 'Не передан id карточки' });
  }

  if (!req.body.user || !req.body.user._id) {
    return res.status(ERROR_CODE_400).send({ message: 'Не передан id пользователя' });
  }

  try {
    const owner = await checkExistenceOfUser(req.body.user._id);
    if (owner === null) {
      return res.status(ERROR_CODE_404).send({ message: 'Невозможно поставить лайк за авторством несуществующего пользователя' });
    }
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id автора' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (card === null) {
        return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id карточки' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteLike = async (req: Request, res: Response) => {
  if (!req.params.cardId) {
    return res.status(ERROR_CODE_400).send({ message: 'Не передан id карточки' });
  }

  if (!req.body.user || !req.body.user._id) {
    return res.status(ERROR_CODE_400).send({ message: 'Не передан id пользователя' });
  }

  try {
    const owner = await checkExistenceOfUser(req.body.user._id);
    if (owner === null) {
      return res.status(ERROR_CODE_404).send({ message: 'Невозможно удалить лайк за авторством несуществующего пользователя' });
    }
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id автора' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.body.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (card === null) {
        return res.status(ERROR_CODE_404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id карточки' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
    });
};

export {
  getCards, postCard, deleteCard, putLike, deleteLike,
};
