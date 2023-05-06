const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports = function findUser(userId, res, next) {
  User.findById(userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id пользователя'));
      } else {
        next(e);
      }
    });
};
