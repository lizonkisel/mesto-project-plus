import { Request, Response } from 'express';

import Card from '../models/card';

const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

const postCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const id = req.body.user._id; // Временное решение, чтобы получить доступ к _id автора,
  // который не передаётся в запросе

  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

const putLike = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

const deleteLike = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.body.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

export {
  getCards, postCard, deleteCard, putLike, deleteLike,
};
