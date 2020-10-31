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
    .catch(error => next(error, req, res));
};

usersController.getAllUsersCount = (req, res, next) => { 
  const sql = `
    SELECT COUNT(*)
    FROM users`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

usersController.getAllUsers = (req, res, next) => {
  const {limit, offset} = req.params;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
  const sql = `
    SELECT id, username
    FROM users
    ${limitClause}
    ${offsetClause}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
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
    .catch(error => next(error, req, res));
};

usersController.getAssignedBugsCount = (req, res, next) => {
  const {userId} = req.params;

  const sql = `
    SELECT COUNT(*)
    FROM bugs
    WHERE bugs.assigned_to = ${userId}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

// gets all projects that the user is a member of
usersController.getProjects = (req, res, next) => {
  const {userId, limit, offset} = req.params;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

  const sql = `
    SELECT projects.id, projects.name, projects.owner
    FROM projects
    INNER JOIN memberlist
    ON memberlist.project_id = projects.id
    WHERE memberlist.user_id = ${userId}
    ORDER BY projects.id
    ${limitClause}
    ${offsetClause}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

// gets the number of projects that the user is a member of
usersController.getProjectsCount = (req, res, next) => {
  const {userId} = req.params;
  
  const sql = `
    SELECT COUNT(*)
    FROM projects
    INNER JOIN memberlist
    ON memberlist.project_id = projects.id
    WHERE memberlist.user_id = ${userId}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

module.exports = usersController;
