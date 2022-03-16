import {ApiRoutes} from "./server";

const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware(ApiRoutes.images, {target: process.env.REACT_APP_SERVER_URL, changeOrigin: true}));
};
