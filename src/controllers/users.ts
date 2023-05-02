import { Request, Response } from 'express';

import { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500 } from '../utils/errors';
import User from '../models/user';

const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' }));
};

const getUser = (req: Request, res: Response) => {
  if (!req.params.userId) {
    return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
  }

  return User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные в метод создания пользователя' });
  }

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' }));
};

const updateProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.body.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' }));
};

const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.body.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' }));
};

export {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};

// https://vsegda-pomnim.com/uploads/posts/2022-04/1651200177_70-vsegda-pomnim-com-p-kisel-iz-yagod-foto-73.jpg
