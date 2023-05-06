const { PORT = 3000 } = process.env;

module.exports = {
  PORT,
  URL: 'mongodb://127.0.0.1:27017/mestodb',
};
