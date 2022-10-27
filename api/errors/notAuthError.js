class NotAuthError extends Error {
  constructor(message = 'Неправильные почта или пароль') {
    super(message);
    this.statusCode = 401;
    this.name = this.constructor.name;
  }
}

module.exports = NotAuthError;
