const db = require('../models/bugs');

const bugsController = {};

// Get all the STATUS values
bugsController.getAllStatus = (req, res, next) => {
  const sql = 'SELECT * from status';

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

// Get all the bugs
bugsController.getAllBugs = (req, res, next) => {
  const {limit, offset} = req.query;

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
    .catch(error => next(error, req, res));
};

// Get the total number of bugs
bugsController.getAllBugsCount = (req, res, next) => {
  const sql = `
    SELECT COUNT(*)
    FROM bugs`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));
};

// Get the details for a bug
bugsController.get = (req, res, next) => {
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
    .catch(error => next(error, req, res));
};

// Create a new bug
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
    .catch(error => next(error, req, res));
};

// Update the details for a bug
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
    .catch(error => next(error, req, res));  
};

// Update the details for a bug
bugsController.updateBug = (req, res, next) => {
  const {bugId} = req.params;
  const {assigned_to, description, projectId, status} = req.body;

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
    .catch(error => next(error, req, res));  
};

// Delete a bug
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
    .catch(error => next(error, req, res));  
};

// Delete a bug
bugsController.deleteBug = (req, res, next) => {
  const {bugId} = req.params;

  const sql = `
    DELETE from bugs
    WHERE id = ${bugId}
    RETURNING id`;
  
  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));  
};

// Set the STATUS to 'RESOLVED' for a bug
bugsController.resolve = (req, res, next) => {
  const {bugId, status} = req.body;

  const sql = `
    UPDATE bugs set status = ${status}
    WHERE id = ${bugId}
    RETURNING id, project_id, author, assigned_to, description, status`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));  
};

// Set the STATUS to 'RESOLVED' for a bug
bugsController.resolveBug = (req, res, next) => {
  const {bugId} = req.params;
  const {status} = req.body;

  const sql = `
    UPDATE bugs set status = ${status}
    WHERE id = ${bugId}
    RETURNING id, project_id, author, assigned_to, description, status`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error, req, res));  
};

module.exports = bugsController;
