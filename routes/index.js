const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { ERROR_NOTFOUND } = require('../utils/constants');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => {
  res.status(ERROR_NOTFOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
