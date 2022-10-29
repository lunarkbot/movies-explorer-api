const { ERRORS } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message = ERRORS.unauthorized.value) {
    super(message);
    this.statusCode = ERRORS.unauthorized.code;
    this.name = this.constructor.name;
  }
}

module.exports = UnauthorizedError;
