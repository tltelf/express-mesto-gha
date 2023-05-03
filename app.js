const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const { celebrate, Joi, Segments } = require('celebrate');

const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

app.use(auth);

app.use(router);

app.use(errorHandler);

app.listen(PORT);
