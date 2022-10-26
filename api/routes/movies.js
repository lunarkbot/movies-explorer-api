const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpUrl, ruName, enName } = require('../constants/regularExpression');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required().integer(),
    year: Joi.number().required().integer().min(4)
      .max(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regExpUrl),
    trailerLink: Joi.string().required().regex(regExpUrl),
    thumbnail: Joi.string().required().regex(regExpUrl),
    nameRU: Joi.string().required().regex(ruName),
    nameEN: Joi.string().required().regex(enName),
  }),
}), addMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;
