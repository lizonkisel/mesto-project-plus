import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import commonRouter from './routes/common-access';
import auth from './middlewares/auth';
import mainRouter from './routes/index';
import errorsHandler from './middlewares/errors';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

app.use(commonRouter);
app.use(auth);
app.use(mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Соединение установлено на порту ${PORT}`);
});
