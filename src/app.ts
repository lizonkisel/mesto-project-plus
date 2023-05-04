import path from 'path';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import userRouter from './routes/users';
import cardRouter from './routes/cards';
// import notFoundRouter from './routes/not-found';

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.body.user = {
    _id: '644f79ff8f25c87ca85c585c',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});
// app.use(notFoundRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Соединение установлено на порту ${PORT}`);
});
