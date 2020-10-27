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
// for now just return a test object
bugsController.create = (req, res, next) => {
  // res.locals.data = { _id: 0, description: 'test bug'};
  // next();
  const {userId, description, assigned_to, projectId, status} = req.body;
  const selection = `INSERT into bugs (author, description, assigned_to, project_id, status) values (${userId},'${description }', ${assigned_to}, ${projectId}, ${status})`;

  db.query(selection)
  .then(results => {
    res.locals.data = results.rows;
    next();
  })
  .catch(error => next(error));
};

// Gets the details for :bugId
// TODO: get bug details
bugsController.get = (req, res, next) => {
  const {bugId} = req.params;
  const selection = `SELECT * from bugs where id = ${bugId}`;
  db.query(selection)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

// Updates a single bug
// status = 0, 1, 2 ...
// TODO: update bug details
bugsController.update = (req, res, next) => {
  const {bugId, assigned_to, description, projectId, status} = req.body;
  const selection = `UPDATE bugs set assigned_to = ${assigned_to}, description = '${description}', project_id = ${projectId}, status = ${status} where id = ${bugId}`;
  db.query(selection)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));  
};

// Deletes a single bug
// TODO: delete a bug
bugsController.delete = (req, res, next) => {
  const {bugId} = req.body;
  const selection = `DELETE from bugs where id = ${bugId}`;
  db.query(selection)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));  
};

// TODO: resolve bug
bugsController.resolve = (req, res, next) => {
  const {bugId} = req.body;
  const resolved = 3; // RESOLVED
  const selection = `UPDATE bugs set status = ${resolved} where id = ${bugId}`;
  db.query(selection)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));  
};

module.exports = bugsController;
