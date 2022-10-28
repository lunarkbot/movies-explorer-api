const { ERRORS } = require('../constants');

class ForbiddenError extends Error {
  constructor(message = ERRORS.forbidden.value) {
    super(message);
    this.statusCode = ERRORS.forbidden.code;
  }
}

module.exports = ForbiddenError;
