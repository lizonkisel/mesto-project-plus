import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

interface IUserModel extends mongoose.Model<IUser> {
   // eslint-disable-next-line  no-unused-vars
  findUserByCredentials: (email: string, password: string) =>
  Promise<mongoose.Document<unknown, any, IUser>>
}

const userSchema = new mongoose.Schema<IUser, IUserModel>({
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
    // validate: {
    //   validator(v: string) {
    //     return validator.isURL(v);
    //   },
    // },
    validate: {
      validator(v: string) {
        return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(v);
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
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('Неверная почта или пароль');
      }
      const userHash = user.password;
      return bcryptjs.compare(password, userHash)
        .then((matched) => {
          if (!matched) {
            throw new Error('Неверная почта или пароль');
          }
          return user;
        });
    });
});

export default mongoose.model<IUser, IUserModel>('user', userSchema);
