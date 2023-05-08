import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

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
    const {
      name, about, avatar, email, password,
    } = req.body;

    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    return res.status(201).send({ data: user });
  } catch (err:any) {
    if (err.code === 11000) {
      return res.status(400).send('Пользователь с таким email уже существует');
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные в метод создания пользователя' });
    }

    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для обновления пользователя' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для обновления аватара' });
    }
    return res.status(ERROR_CODE_500).send({ message: 'На сервере произошла ошибка' });
  }
};

export {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};

// https://vsegda-pomnim.com/uploads/posts/2022-04/1651200177_70-vsegda-pomnim-com-p-kisel-iz-yagod-foto-73.jpg
