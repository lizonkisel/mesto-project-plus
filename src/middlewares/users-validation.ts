import { celebrate, Joi } from 'celebrate';

const validateGetUserById = celebrate({
  // headers: Joi.object().keys({
  //   Authorization: Joi.string(),
  // }),
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    // avatar: Joi.string().uri(),
    avatar: Joi.string().pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    // user: Joi.object().keys({
    //   _id: Joi.string().required().alphanum().hex()
    //     .length(24),
    // }).unknown(true),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    // user: Joi.object().keys({
    //   _id: Joi.string().required().alphanum().hex()
    //     .length(24),
    // }).unknown(true),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
    // avatar: Joi.string().uri(),
    // user: Joi.object().keys({
    //   _id: Joi.string().required().alphanum().hex()
    //     .length(24),
    // }).unknown(true),
  }),
});

export {
  validateGetUserById, validateCreateUser,
  validateLogin, validateUpdateProfile, validateUpdateAvatar,
};
