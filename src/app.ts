import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

import mainRouter from './routes/index';

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

app.use(mainRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Соединение установлено на порту ${PORT}`);
});
