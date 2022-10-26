const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden');
const BadRequestError = require('../errors/badRequest');
const NotFound = require('../errors/notFound');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner = req.user._id,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные некорректны'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.send({
            message: 'Фильм успешно удален'
          }))
          .catch(next);
      } else {
        next(new ForbiddenError('Удалить данный фильм невозможно. Вы не являетесь владельцем фильмотеки.'))
      }
    })
    .catch(next);
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
}