const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const router = require('./routes');
const config = require('./config/config');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { signinJoi, signupJoi } = require('./utils/reqValidate');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.URL, {
  useNewUrlParser: true,
});

app.post(
  '/signin',
  celebrate(signinJoi),
  login,
);

app.post(
  '/signup',
  celebrate(signupJoi),
  createUser,
);

app.use(auth);

app.use(router);

app.use(errors());

app.use(errorHandler);

app.listen(config.PORT);
