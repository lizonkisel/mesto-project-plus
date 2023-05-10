import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

import mainRouter from './routes/index';
import { login, createUser } from './controllers/users';
import auth from './middlewares/auth';

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// app.use((req, res, next) => {
//   req.body.user = {
//     _id: '6454e30cdf9bc70e05fa234e',
//   };

//   next();
// });

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(mainRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Соединение установлено на порту ${PORT}`);
});

// {
//   "_id": {
//     "$oid": "644f79ff8f25c87ca85c585c"
//   },
//   "name": "Кисель",
//   "about": "Талантливый разработчик",
//   "avatar": "https://vsegda-pomnim.com/uploads/posts/2022-04/1651200177_70-vsegda-pomnim-com-p-kisel-iz-yagod-foto-73.jpg",
//   "__v": 0
// }
