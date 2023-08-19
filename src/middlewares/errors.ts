import { Request, Response, NextFunction } from 'express';
import { ERROR_CODE_500 } from '../errors/error-codes';

const errorsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = ERROR_CODE_500, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_CODE_500 ? 'На сервере произошла ошибка' : message,
  });

  next();
};

export default errorsHandler;
