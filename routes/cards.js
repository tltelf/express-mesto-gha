const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { createCardJoi, idJoi } = require('../utils/reqValidate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const checkCardOwner = require('../middlewares/checkCardOwner');

cardsRouter.get('/', getCards);

cardsRouter.post(
  '/',
  celebrate(createCardJoi),
  createCard,
);

cardsRouter.delete(
  '/:id',
  celebrate(idJoi),
  checkCardOwner,
  deleteCard,
);

cardsRouter.put(
  '/:id/likes',
  celebrate(idJoi),
  likeCard,
);

cardsRouter.delete(
  '/:id/likes',
  celebrate(idJoi),
  dislikeCard,
);

module.exports = cardsRouter;
