const router = require('express').Router();
const {
  validateAddMovie,
  validateDeleteMovie,
} = require('../middlewares/validation');

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateAddMovie, addMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
