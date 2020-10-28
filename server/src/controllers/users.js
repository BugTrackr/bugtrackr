const db = require('../models/bugs');

const usersController = {};

usersController.get = (req, res, next) => {
  const {userId} = req.params;
  
  const sql = `
    SELECT id, username
    FROM users
    WHERE id = ${userId}`;
  
  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

// Get all assigned bugs for userId
//
// TODO: ordering
// By default, order will be by bugId and project(?)
usersController.getAssignedBugs = (req, res, next) => {
  const {userId, limit, offset} = req.params;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

  const sql = `
    SELECT *
    FROM bugs
    WHERE bugs.assigned_to = ${userId}
    ORDER BY bugs.id
    ${limitClause}
    ${offsetClause}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

module.exports = usersController;
