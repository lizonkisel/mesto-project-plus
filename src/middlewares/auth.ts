import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import UnauthorizedError from '../errors/unauthorized-err';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
    // throw new Error('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Передан некорректный токен'));
    // throw new Error('Необходима авторизация');
  }
  req.body.user = payload;

  return next();
};
