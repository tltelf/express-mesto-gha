const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

module.exports = function changeLikeStatus(req, res, next, params) {
  Card.findByIdAndUpdate(
    req.params.id,
    params,
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.send(card);
    })
    .catch(next);
};
