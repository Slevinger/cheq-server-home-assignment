const _ = require("lodash");

module.exports = (req, res, next) => {
  try {
    const { id: vastId } = req.query;
    req.ctx = { vastId };

    next();
  } catch (e) {
    next(e);
  }
};
