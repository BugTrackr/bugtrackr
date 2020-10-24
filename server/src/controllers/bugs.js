const db = require('../models/bugs');

const bugsController = {};

// test route to get all STATUS values
bugsController.getAllStatus = (req, res, next) => {
  const selection = 'SELECT * from status';
  db.query(selection)
  .then(results => {
    res.locals.data = results.rows;
    next();
  })
  .catch(error => next(error));
};

// TODO: create bug
bugsController.create = (req, res, next) => {

};

// TODO: get bug details
bugsController.get = (req, res, next) => {

};

// TODO: update bug details
bugsController.update = (req, res, next) => {

};

// TODO: delete a bug
bugsController.delete = (req, res, next) => {

};

// TODO: get list of assigned bugs
bugsController.getAssigned = (req, res, next) => {

};

// TODO: resolve bug
bugsController.resolve = (req, res, next) => {

};

module.exports = bugsController;
