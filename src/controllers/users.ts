import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500 } from '../utils/errors';
import User from '../models/user';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).send({ data: users });
  } catch (err) {
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId).orFail();
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id пользователя' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(201).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные в метод создания пользователя' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, about } = req.body;
    if (!name && !about) {
      const err = new Error('Не передано новое имя или описание пользователя');
      err.name = 'CustomValid';
      throw err;
    }
    if (!req.body.user || !req.body.user._id) {
      const err = new Error('Не передан id пользователя');
      err.name = 'CustomValid';
      throw err;
    }
    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof Error && err.name === 'CustomValid') {
      return res.status(400).send({ message: err.message });
    }
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id пользователя' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      const err = new Error('Не передан новый аватар');
      err.name = 'CustomValid';
      throw err;
    }
    if (!req.body.user || !req.body.user._id) {
      const err = new Error('Не передан id пользователя');
      err.name = 'CustomValid';
      throw err;
    }
    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof Error && err.name === 'CustomValid') {
      return res.status(400).send({ message: err.message });
    }
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(ERROR_CODE_400).send({ message: 'Передан невалидный id пользователя' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

export {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};

// https://vsegda-pomnim.com/uploads/posts/2022-04/1651200177_70-vsegda-pomnim-com-p-kisel-iz-yagod-foto-73.jpg
