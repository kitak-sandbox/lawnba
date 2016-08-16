module.exports = function (app) {
  app.use('/repos', require('../app/controllers/repos'));
};
