const { Joi, Segments } = require('celebrate');
const { regExpUrl } = require('../constants/constants');

const signinJoi = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const signupJoi = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExpUrl),
  }),
};

const createCardJoi = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regExpUrl),
  }),
};

const idJoi = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
};

const updateProfileJoi = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const updateAvatarJoi = {
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExpUrl),
  }),
};

module.exports = {
  signinJoi,
  signupJoi,
  createCardJoi,
  idJoi,
  updateProfileJoi,
  updateAvatarJoi,
};
