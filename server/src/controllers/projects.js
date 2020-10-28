const db = require('../models/bugs');

const projectsController = {};

projectsController.getAllProjects = (req, res, next) => {
  const sql = `SELECT * FROM projects`;
  db.query(sql)
  .then(results => {
    res.locals.data = results.rows;
    next();
  })
  .catch(error => next(error));
}

projectsController.getMembers = (req, res, next) => {
  const {projectId} = req.params;
  const sql = `
    SELECT projects.id as project_id, projects.name as project_name, users.id as user_id, users.username
    FROM ((memberlist
    INNER JOIN projects
    ON memberlist.project_id = projects.id)
    INNER JOIN users
    ON users.id = memberlist.user_id)
    WHERE projects.id = ${projectId}`;
    db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));    
}

projectsController.getDetails = (req, res, next) => {
  const {projectId} = req.params;
  const sql = `
    SELECT *
    FROM projects
    WHERE id = ${projectId}`;
    db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));}

projectsController.update = (req, res, next) => {

}

projectsController.updateMembers = (req,res, next) => {

}

projectsController.delete = (req, res, next) => {

}

projectsController.create = (req, res, next) => {

}

module.exports = projectsController;
