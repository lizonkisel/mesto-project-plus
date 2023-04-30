import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Соединение установлено на порту ${PORT}`);
});
