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

}

projectsController.getDetails = (req, res, next) => {

}

projectsController.update = (req, res, next) => {

}

projectsController.updateMembers = (req,res, next) => {

}

projectsController.delete = (req, res, next) => {

}

projectsController.create = (req, res, next) => {

}

module.exports = projectsController;
