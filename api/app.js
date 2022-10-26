require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const router = require('./routes');
const errorMessage = require('./errors/errorMessage');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils');

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = express();

app.use(limiter);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(helmet());

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use(errorMessage);

app.listen(PORT);
