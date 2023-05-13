import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import IRequest from '../types';
import UnauthorizedError from '../errors/unauthorized-err';

export default (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Передан некорректный токен'));
  }
  req.user = payload as { _id: JwtPayload };

  return next();
};
