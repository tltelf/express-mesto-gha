const cardsRouter = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

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
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/^https*:\/\/(w{3})*\w+\S+$/),
    }),
  }),
  createCard,
);
cardsRouter.delete('/:id', checkCardOwner, deleteCard);
cardsRouter.put('/:id/likes', likeCard);
cardsRouter.delete('/:id/likes', dislikeCard);

module.exports = cardsRouter;
