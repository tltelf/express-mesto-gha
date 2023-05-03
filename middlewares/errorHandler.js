const { isCelebrateError } = require("celebrate");

module.exports = ((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    message = err.details.get('body').details[0].message;
    statusCode = 400;
  }
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
