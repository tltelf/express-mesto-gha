const { default: mongoose } = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const changeLikeStatus = require('../utils/changeLikeStatus');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const id = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(e);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: 'Пост удалён' });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const params = { $addToSet: { likes: req.user._id } };
  changeLikeStatus(req, res, next, params);
};

const dislikeCard = (req, res, next) => {
  const params = { $pull: { likes: req.user._id } };
  changeLikeStatus(req, res, next, params);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
