const path = require('path');

module.exports = function () {
  return function htmlExtMiddleware (req, res, next) {
    const url = req.url;
    if (url !== '/' && !path.extname(url)) {
      req.url = req.url + '.html';
    }

    next();
  };
};
