import mongoose from 'mongoose';
import validator from 'validator';

const cardSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: 'String',
    required: true,
    validate: {
      validator(v: string) {
        return validator.isURL(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('card', cardSchema);
