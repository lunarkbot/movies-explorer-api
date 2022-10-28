const { ERRORS } = require('../constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERRORS.server.code } = err;

  res
    .status(statusCode)
    .send({
      message: ERRORS.server.value,
    });
  next();
};
