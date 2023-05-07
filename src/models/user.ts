import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: 'String',
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: 'String',
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v: string) {
        return validator.isEmail(v);
      },
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('user', userSchema);
