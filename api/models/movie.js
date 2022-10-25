import mongoose from 'mongoose';
const { default: isURL } = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    minLength: 4,
    maxLength: 4,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
