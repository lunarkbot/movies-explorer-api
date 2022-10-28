const router = require('express').Router();
const routerMovies = require('./movies');
const routerUsers = require('./users');
const routerAuth = require('./auth');
const { auth } = require('../middlewares/auth');
const { signOut } = require('../controllers/users');
const { ERRORS } = require('../constants/index');
const NotFoundError = require('../errors/notFoundError');

router.use('/', routerAuth);

router.use(auth);

router.get('/signout', signOut);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);

router.all('/*', (req, res, next) => {
  next(new NotFoundError(ERRORS.notFound.page));
});

module.exports = router;
