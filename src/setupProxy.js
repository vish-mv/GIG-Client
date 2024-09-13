const {createProxyMiddleware} = require('http-proxy-middleware');
const API_URL = window?.configs?.serviceURL ? window.configs.serviceURL : "/";


module.exports = function (app) {
  app.use(createProxyMiddleware('/images', {target: API_URL, changeOrigin: true}));
};
