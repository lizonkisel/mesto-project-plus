import { Request, Response } from 'express';

const getNotFoundPage = (req: Request, res: Response) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
};

export default getNotFoundPage;
