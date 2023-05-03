const usersRouter = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getUserInfo,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/me', getUserInfo);
usersRouter.get('/', getUsers);
usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  getUser,
);
usersRouter.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
usersRouter.patch(
  '/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().pattern(/^https*:\/\/(w{3})*\w+\S+$/),
    }),
  }),
  updateAvatar,
);

module.exports = usersRouter;
