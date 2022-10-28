const router = require('express').Router();
const {
  validateSignIn,
  validateSignUp,
} = require('../middlewares/validation');
const {
  signUp,
  signIn,
} = require('../controllers/users');

router.post('/signin', validateSignIn, signIn);
router.post('/signup', validateSignUp, signUp);

module.exports = router;
