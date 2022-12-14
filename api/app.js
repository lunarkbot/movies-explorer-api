require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const router = require('./routes');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils');
const { DB_DEFAULT_URL } = require('./constants/config');

const {
  PORT = 3000,
  DB_URL = DB_DEFAULT_URL,
} = process.env;

const app = express();

app.use(requestLogger);
//app.use(limiter);
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT);

app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
