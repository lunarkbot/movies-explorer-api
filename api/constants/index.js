const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://web.kbot.nomoredomains.icu',
  'https://web.kbot.nomoredomains.icu',
  'web.kbot.nomoredomains.icu',
];

module.exports = {
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
