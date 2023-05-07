const { default: mongoose } = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports = async (req, res, next) => {
  let card;
  try {
    card = await Card.findById(req.params.id);
    if (card === null) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
      return;
    }
    next(e);
    return;
  }
  if (card.owner.toString() !== req.user._id) {
    next(new ForbiddenError('Вы можете удалять только собственные карточки'));
  } else {
    next();
  }
};
