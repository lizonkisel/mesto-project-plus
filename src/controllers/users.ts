import { Request, Response } from 'express';

import User from '../models/user';

const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

const getUser = (req: Request, res: Response) => {
  // Возможно, тут будет другое имя параметра - не userId
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла какая-то ошибка' }));
};

export { getUsers, getUser, createUser };
