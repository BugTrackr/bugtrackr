const db = require('../models/bugs');

const usersController = {};

// Get all of the bugs assigned to a user
usersController.getAssignedBugs = (req, res, next) => {
  const {userId} = req.params;
  const {limit, offset} = req.query;

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

// Get the number of bugs assigned to a user
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

// Get all of the bugs authored by a user
usersController.getAuthoredBugs = (req, res, next) => {
  const {userId} = req.params;
  const {limit, offset} = req.query;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

  const sql = `
    SELECT *
    FROM bugs
    WHERE bugs.author = ${userId}
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

// Get the number of bugs authored by a user
usersController.getAuthoredBugsCount = (req, res, next) => {
  const {userId} = req.params;

  const sql = `
    SELECT COUNT(*)
    FROM bugs
    WHERE bugs.author = ${userId}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

// Get all the projects the user is a member of
usersController.getMemberProjects = (req, res, next) => {
  const {userId} = req.params;
  const {limit, offset} = req.query;

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

// Get the number of projects the user is a member of
usersController.getMemberProjectsCount = (req, res, next) => {
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

// Get all the projects the user is the owner of
usersController.getOwnedProjects = (req, res, next) => {
  const {userId} = req.params;
  const {limit, offset} = req.query;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

  const sql = `
    SELECT projects.id, projects.name, projects.owner
    FROM projects
    WHERE projects.owner = ${userId}
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

// Get the number of projects the user is the owner of
usersController.getOwnedProjectsCount = (req, res, next) => {
  const {userId} = req.params;
  
  const sql = `
    SELECT COUNT(*)
    FROM projects
    WHERE projects.owner = ${userId}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

// Get the total number of users
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

// Get the number of bugs that a user has authored or has been assigned
usersController.getBugsCount = (req, res, next) => {
  const {userId} = req.params;

  const sql = `
    SELECT COUNT(*)
    FROM bugs
    WHERE bugs.assigned_to = ${userId}
      or bugs.author = ${userId}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

// Get all the bugs that a user has authored or has been assigned
usersController.getBugs = (req, res, next) => {
  const {userId} = req.params;
  const {limit, offset} = req.query;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;

  const sql = `
    SELECT *
    FROM bugs
    WHERE bugs.assigned_to = ${userId} or bugs.author = ${userId}
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

// Get the details for a user
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

// Get all users
usersController.getAllUsers = (req, res, next) => {
  const {limit, offset} = req.query;

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

module.exports = usersController;
