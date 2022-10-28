const { ERRORS } = require('../constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERRORS.server.code, message } = err;

  res
    .status(err.statusCode)
    .send({
      message: statusCode === 500
        ? ERRORS.server.value
        : message,
    });
  next();
};
