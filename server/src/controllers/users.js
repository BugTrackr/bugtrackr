const db = require('../models/bugs');

const usersController = {};

// Get all assigned bugs for userId
// route /users/getAssigned/:userId
//
// TODO: ordering
// 
// By default, order will be by bugId and project(?)
usersController.getAssigned = (req, res, next) => {
  const {userId, limit, offset} = req.params;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  const selection = `
    SELECT * from bugs
    WHERE bugs.assigned_to = ${userId}
    ORDER BY bugs.id
    ${limitClause}
    ${offsetClause}`;

  db.query(selection)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

module.exports = usersController;