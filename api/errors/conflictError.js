const { ERRORS } = require('../constants');

class ConflictError extends Error {
  constructor(message = ERRORS.conflict.value) {
    super(message);
    this.statusCode = ERRORS.conflict.code;
  }
}

module.exports = ConflictError;
