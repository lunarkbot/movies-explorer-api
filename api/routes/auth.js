const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  signUp,
  signIn,
  signOut,
} = require('../controllers/users');

router.post('/signin'), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}, signIn);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}), signUp);

router.get('/signout', signOut);

module.exports = router;
