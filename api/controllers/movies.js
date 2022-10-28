const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const { ERRORS } = require('../constants');

const getMovies = (req, res, next) => {
  Movie.find({
    owner: req.user._id,
  })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(ERRORS.notFound.movie);
    })
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.send({
            message: 'Фильм успешно удален',
          }))
          .catch(next);
      } else {
        next(new ForbiddenError());
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
