const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { idJoi, updateProfileJoi, updateAvatarJoi } = require('../utils/reqValidate');
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
  celebrate(idJoi),
  getUser,
);

usersRouter.patch(
  '/me',
  celebrate(updateProfileJoi),
  updateProfile,
);

usersRouter.patch(
  '/me/avatar',
  celebrate(updateAvatarJoi),
  updateAvatar,
);

module.exports = usersRouter;
