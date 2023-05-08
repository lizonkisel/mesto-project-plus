import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: 'String',
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: 'String',
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: 'String',
    validate: {
      validator(v: string) {
        return validator.isURL(v);
      },
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: 'String',
    required: true,
    validate: {
      validator(v: string) {
        return validator.isEmail(v);
      },
    },
    unique: true,
  },
  password: {
    type: 'String',
    required: true,
  },
});

export default mongoose.model('user', userSchema);
