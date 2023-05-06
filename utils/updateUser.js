const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports = function updateUser(req, res, next, params) {
  User.findByIdAndUpdate(
    req.user._id,
    params,
    { new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id пользователя'));
      }
      next(e);
    });
};
