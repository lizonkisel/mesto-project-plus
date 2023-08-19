import { celebrate, Joi } from 'celebrate';

const validatePostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
});

const validatePutLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
});

const validateDeleteLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
});

export {
  validatePostCard, validateDeleteCard, validatePutLike, validateDeleteLike,
};
