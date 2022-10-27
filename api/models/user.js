const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const NotAuthError = require('../errors/notAuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Введите корректный email.');
      }
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthError());
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuthError());
          }

          return user;
        });
    });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
