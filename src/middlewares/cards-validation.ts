import { celebrate, Joi } from 'celebrate';

const validatePostCard = celebrate({
  // params: Joi.object().keys({
  //   userId: Joi.string().required().alphanum().hex()
  //     .length(24),
  // }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum().hex()
        .length(24),
    }).unknown(true),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum().hex()
        .length(24),
    }).unknown(true),
  }),
});

const validatePutLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum().hex()
        .length(24),
    }).unknown(true),
  }),
});

const validateDeleteLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum().hex()
        .length(24),
    }).unknown(true),
  }),
});

export {
  validatePostCard, validateDeleteCard, validatePutLike, validateDeleteLike,
};
