const { ERRORS } = require('../constants');

class BadRequestError extends Error {
  constructor(message = ERRORS.badRequest.value) {
    super(message);
    this.statusCode = ERRORS.badRequest.code;
  }
}

module.exports = BadRequestError;
