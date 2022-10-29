const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://web.kbot.nomoredomains.icu',
  'https://web.kbot.nomoredomains.icu',
  'web.kbot.nomoredomains.icu',
];

const ERRORS = {
  badRequest: {
    code: 400,
    value: 'Переданы некорректные данные.',
  },
  unauthorized: {
    code: 401,
    value: 'Неправильные почта или пароль.',
    auth: 'Необходима авторизация.',
    authError: 'Ошибка авторизации.',
  },
  forbidden: {
    code: 403,
    value: 'Доступ запрещен.',
  },
  notFound: {
    code: 404,
    movie: 'Фильм не найден.',
    user: 'Пользователь не найден.',
    page: 'Страница не найдена.',
  },
  conflict: {
    code: 409,
    value: 'Пользователь с данным email уже зарегистрирован.',
  },
  server: {
    code: 500,
    value: 'На сервере произошла ошибка.',
  },
  invalidEmail: {
    value: 'Пожалуйста, введите корректный email.',
  },
};

module.exports = {
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  ERRORS,
};
