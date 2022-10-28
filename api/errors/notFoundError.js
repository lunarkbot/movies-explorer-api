const { ERRORS } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERRORS.notFound.code;
    this.name = this.constructor.name;
  }
}

module.exports = NotFoundError;
