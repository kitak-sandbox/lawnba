module.exports = function (app) {
  app.use('/repos', require('../server/controllers/repos'));
  app.use('/jobs', require('../server/controllers/jobs'));
};
