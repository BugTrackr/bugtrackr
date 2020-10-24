const db = require('../models/bugs');

const bugsController = {};

bugsController.getAllStatus = (req, res, next) => {
  const selection = 'SELECT * from status';
  db.query(selection)
  .then(results => {
    res.locals.data = results.rows;
    next();
  })
  .catch(error => next(error));
};

module.exports = bugsController;
