const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const id = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch((e) => {
      if (e.name === 'ValidationError') {
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
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.send(card);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      if (e.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id карточки'));
      }
      next(e);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.send(card);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      }
      if (e.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id карточки'));
      }
      next(e);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
