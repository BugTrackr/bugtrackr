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
};

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
};

projectsController.addMember = (req, res, next) => {
  const {projectId, userId} = req.body;

  const sql = `
    INSERT INTO memberlist (project_id, user_id)
    VALUES (${projectId}, ${userId})
    RETURNING id, project_id, user_id`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

projectsController.updateMembers = (req, res, next) => {
  const {projectId, members} = req.body;

  // first delete all existing members
  let sql = `
    DELETE FROM memberlist
    WHERE project_id = ${projectId}`

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
    })
    .catch(error => next(error));

  // add users to memberlist
  members.forEach(userId => {
    const sql = `
      INSERT into memberlist (user_id, project_id)
      VALUES (${userId}, ${projectId})
      RETURNING id, project_id, user_id`;

    db.query(sql)
        .then(results => {
          res.locals.data = results.rows;
          next();
        })
        .catch(error => next(error));
  });
};

projectsController.removeMember = (req, res, next) => {
  const {projectId, userId} = req.body;

  const sql = `
    DELETE FROM memberlist
    WHERE user_id = ${userId} and project_id = ${projectId}
    RETURNING user_id`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

projectsController.create = (req, res, next) => {
  const {name, owner, users} = req.body;
  
  // first create the project and get the projectId
  const sql = `
    INSERT into projects (name, owner)
    VALUES (${name}, ${owner})
    RETURNING id, name, owner`;

  let projectId;

  db.query(sql)
    .then(results => {
      projectId = results.rows[0].id;
    })
    .catch(error => next(error));

  // then create the memberlist
  if (users.length > 0) {
    const members = [];
    users.forEach(userId => {
      const sql = `
        INSERT INTO memberlist (user_id, project_id)
        VALUES (${userId}, ${projectId})
        RETURNING user_id`;

      db.query(sql)
        .then(results => {
          members.push(results.rows[0].user_id);
        })
        .catch(error => next(error));
    });
  }
};

projectsController.get = (req, res, next) => {
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
    .catch(error => next(error));
};

projectsController.update = (req, res, next) => {
  const {projectId, name, owner} = req.body;
  const sql = `
    UPDATE projects
    SET name = ${name}, owner = ${owner}
    WHERE id = ${projectId}
    RETURNING id, name, owner`

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

projectsController.delete = (req, res, next) => {
  const {projectId} = req.body;

  // first delete the memberlist
  let sql = `
    DELETE FROM memberlist
    WHERE project_id = ${projectId}`;
  
  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
    })
    .catch(error => next(error)); 

  // then delete the project itself
  sql = `
    DELETE FROM projects
    WHERE id = ${projectId}
    RETURNING id`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));    
};

module.exports = projectsController;
