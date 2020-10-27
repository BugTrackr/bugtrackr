const db = require('../models/bugs');

const usersController = {};

// Get all assigned bugs for userId
// route /users/getAssigned/:userId
//
// TODO: pagination and ordering
//
// By default, order will be by bugId and project(?)
usersController.getAssigned = (req, res, next) => {
  const {userId} = req.params;
  const selection = `SELECT * from bugs where bugs.assigned_to = ${userId} order by bugs.id`;
  db.query(selection)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

module.exports = usersController;