require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const { ERRORS } = require('../constants');

const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-code';
    payload = jwt.verify(token, secret);
  } catch (err) {
    next(new UnauthorizedError(ERRORS.unauthorized.auth));
    return;
  }

  req.user = payload;

  next();
};

module.exports = { auth };
