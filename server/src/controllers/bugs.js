const db = require('../models/bugs');

const bugsController = {};

bugsController.getAllStatus = (req, res, next) => {
  const sql = 'SELECT * from status';

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

// TODO: required vs optiona fields, what data is sent, and error flows

bugsController.create = (req, res, next) => {
  const {userId, description, assigned_to, projectId, status} = req.body;

  const sql = (assigned_to === undefined)
  ? `
    INSERT into bugs (author, description, project_id, status)
    VALUES (${userId},'${description }', ${projectId}, ${status})
    RETURNING id, project_id, author, assigned_to, description, status`
  : `INSERT into bugs (author, description, assigned_to, project_id, status)
    VALUES (${userId},'${description }', ${assigned_to}, ${projectId}, ${status})
    RETURNING id, project_id, author, assigned_to, description, status`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

// Gets the details for :bugId
bugsController.get = (req, res, next) => {
  console.log('bugsController.get');
  const {bugId} = req.params;
  const sql = `
    SELECT *
    FROM bugs
    WHERE id = ${bugId}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

// Updates a single bug
bugsController.update = (req, res, next) => {
  const {bugId, assigned_to, description, projectId, status} = req.body;
  const sql = (assigned_to === undefined)
  ? `UPDATE bugs
    SET description = '${description}', project_id = ${projectId}, status = ${status}
    WHERE id = ${bugId}
    RETURNING id, project_id, author, assigned_to, description, status`
  : `UPDATE bugs set assigned_to = ${assigned_to}, description = '${description}', project_id = ${projectId}, status = ${status}
    WHERE id = ${bugId}
    RETURNING id, project_id, author, assigned_to, description, status`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));  
};

// Deletes a single bug
bugsController.delete = (req, res, next) => {
  const {bugId} = req.body;
  const sql = `
    DELETE from bugs
    WHERE id = ${bugId}
    RETURNING id`;
  
  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));  
};

// Sets the status to 'RESOLVED' for a single bug
// The frontend UI should have all STATUS values since it needs to display them in a dropdown
// The 'resolve' operation should send the STATUS ID in this request
bugsController.resolve = (req, res, next) => {
  const {bugId, resolved} = req.body;
  const sql = `
    UPDATE bugs set status = ${resolved}
    WHERE id = ${bugId}
    RETURNING id, project_id, author, assigned_to, description, status`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));  
};

// Gets all the bugs
bugsController.getAllBugs = (req, res, next) => {
  const {limit, offset} = req.params;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
  const sql = `
    SELECT *
    FROM bugs
    ${limitClause}
    ${offsetClause}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

// Gets all the bugs
bugsController.getAllBugsCount = (req, res, next) => {
  const sql = `
    SELECT COUNT(*)
    FROM bugs`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

module.exports = bugsController;
