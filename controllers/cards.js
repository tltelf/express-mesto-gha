const Card = require('../models/card');
const {
  ERROR_CODE,
  ERROR_NOTFOUND,
  DEFAULT_ERROR,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const id = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (data === null) {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.send({ message: 'Пост удалён' });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для удаления карточки' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const likeCard = (req, res) => {
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
        res.status(ERROR_NOTFOUND).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки лайка' });
        return;
      }
      if (e.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Передан некорректный _id карточки' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
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
        res.status(ERROR_NOTFOUND).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для снятия лайка' });
        return;
      }
      if (e.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Передан некорректный _id карточки' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
