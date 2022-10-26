const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const NotAuthError = require('../errors/notAuthError');

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.send({
          name: user.name,
          email: user.email,
          _id: user._id,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Данные некорректны'));
          } else if (err.code === 11000) {
            next(new ConflictError('Пользователь с данным email уже существует'));
          } else {
            next(err);
          }
        });
    });
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        next(new NotAuthError('Ошибка авторизации'));
      }

      const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-code';
      const token = jwt.sign(
        { _id: user._id },
        secret,
        { expiresIn: '7d' }
      );

      res
        .cookie('access_token', token, {
          sameSite: 'true',
          secure: process.env.NODE_ENV === 'production',
        })
        .send({ message: 'Аутентификация прошла успешно' });
    })
    .catch(next);
}

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFound());
      }

      return res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден.'));
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  signUp,
  signIn,
  getCurrentUser,
  updateUser,
};
