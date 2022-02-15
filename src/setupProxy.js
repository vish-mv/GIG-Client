const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/files', { target: process.env.REACT_APP_SERVER_URL }));
};
