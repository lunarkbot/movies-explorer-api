const { celebrate, Joi } = require('celebrate');
const { regExpUrl, ruName, enName } = require('../constants/regularExpression');

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required().integer(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regExpUrl),
    trailerLink: Joi.string().required().regex(regExpUrl),
    thumbnail: Joi.string().required().regex(regExpUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(ruName),
    nameEN: Joi.string().required().regex(enName),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateUpdateUser,
  validateAddMovie,
  validateDeleteMovie,
  validateSignIn,
  validateSignUp,
};
