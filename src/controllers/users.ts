import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import BadRequestError from '../errors/bad-request-err';
// import UnauthorizedError from '../errors/unauthorized-err';
import NotFoundError from '../errors/not-found-err';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res.status(200).send({ data: users });
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId).orFail();
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Передан невалидный id пользователя'));
    }
    return next(err);
  }
};

const getUserMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const myId = req.body.user._id;
    const me = await User.findById(myId).orFail();
    return res.status(200).send({ data: me });
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
    // Вот эта ошибка не срабатывает (и будет не нужна), когда я напишу обработчик ошибок, используя celebrate
    // if (err instanceof mongoose.Error.ValidationError) {
    //   return next(new BadRequestError('Переданы некорректные данные в метод создания пользователя'));
    //   // return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные в метод создания пользователя' });
    // }
    if (err.code === 11000) {
      return next(new BadRequestError('Пользователь с таким email уже существует'));
    }
    return next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      // Вот эта ошибка не срабатывает (и будет не нужна), когда я напишу обработчик ошибок, используя celebrate
      // return next(new UnauthorizedError('Переданы некорректные данные для входа в аккаунт'));
      return next(err);
    });
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
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
      return next(new NotFoundError('Пользователь не найден'));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные для обновления пользователя'));
    }
    return next(err);
  }
};

const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
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
      return next(new NotFoundError('Пользователь не найден'));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные для обновления аватара'));
    }
    return next(err);
  }
};

export {
  getUsers, getUserById, getUserMe, createUser, login, updateProfile, updateAvatar,
};

// https://vsegda-pomnim.com/uploads/posts/2022-04/1651200177_70-vsegda-pomnim-com-p-kisel-iz-yagod-foto-73.jpg
