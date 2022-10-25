const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://localhost:3000',
  'http://web.kbot.nomoredomains.icu',
  'https://web.kbot.nomoredomains.icu',
  'web.kbot.nomoredomains.icu',
];

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
