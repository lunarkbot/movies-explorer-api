require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { auth } = require('./middlewares/auth');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const routerAuth = require('./routes/auth');
const errorMessage = require('./errors/errorMessage');
const NotFound = require('./errors/notFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use('/', routerAuth);
app.use(auth);
app.use('/users', routerUsers);
app.use('/movies', routerMovies);

app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена.'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorMessage);

app.listen(PORT);
