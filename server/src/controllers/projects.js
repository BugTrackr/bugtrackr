const db = require('../models/bugs');

const projectsController = {};

// gets the list of all projects
projectsController.getAllProjects = (req, res, next) => {
  const {limit, offset} = req.params;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
  const sql = `
    SELECT *
    FROM projects
    ORDER by projects.id
    ${limitClause}
    ${offsetClause}`;

  db.query(sql)
  .then(results => {
    res.locals.data = results.rows;
    next();
  })
  .catch(error => next(error));
};

// gets the number of projects
projectsController.getAllProjectsCount = (req, res, next) => {
  const sql = `
    SELECT COUNT(*)
    FROM projects`;

  db.query(sql)
  .then(results => {
    res.locals.data = results.rows;
    next();
  })
  .catch(error => next(error));
};

projectsController.getMembers = (req, res, next) => {
  const {projectId, limit, offset} = req.params;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
  const sql = `
    SELECT projects.id as project_id, projects.name as project_name, users.id as user_id, users.username
    FROM ((memberlist
    INNER JOIN projects
    ON memberlist.project_id = projects.id)
    INNER JOIN users
    ON users.id = memberlist.user_id)
    WHERE projects.id = ${projectId}
    ORDER BY users.id
    ${limitClause}
    ${offsetClause}`;

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

projectsController.updateMembers = async (req, res, next) => {
  const {projectId, members} = req.body;

  // first delete all existing members
  let sql = `
    DELETE FROM memberlist
    WHERE project_id = ${projectId}`

  await db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
    })
    .catch(error => next(error));

  const memberList = [];
  // add users to memberlist
  res.locals.data = [];
  const newMembers = [];
  members.forEach(userId => {
    newMembers.push(`(${userId}, ${projectId})`)
  });
  const values = newMembers.join(',');
  sql = `
    INSERT INTO memberlist (user_id, project_id)
    VALUES ${values}
    RETURNING id, project_id, user_id`;

  await db.query(sql)
      .then(results => {
        res.locals.data.push(...results.rows);
        memberList.push(res.locals.data);
      })
      .catch(error => next(error));
  next();
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

projectsController.create = async (req, res, next) => {
  const {name, owner, users} = req.body;
  
  // first create the project and get the projectId
  const sql = `
    INSERT INTO projects (name, owner)
    VALUES ('${name}', ${owner})
    RETURNING id, name, owner`;

  let projectId;

  await db.query(sql)
    .then(results => {
      projectId = results.rows[0].id;
      res.locals.data = results.rows;
      // next();
    })
    .catch(error => next(error, req, res));

  // then create the memberlist
  if (users.length > 0) {
    const members = [];
    users.forEach(userId => {
      members.push(`(${userId}, ${projectId})`);
    });
    const values = members.join(',');
    const sql = `
      INSERT INTO memberlist (user_id, project_id)
      VALUES ${values}
      RETURNING user_id`;

    await db.query(sql)
      .then(results => {
        res.locals.members = results.rows;
      })
      .catch(error => next(error, req, res));
  }
  next();
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
    SET name = '${name}', owner = ${owner}
    WHERE id = ${projectId}
    RETURNING id, name, owner`

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));
};

projectsController.delete = async (req, res, next) => {
  const {projectId} = req.body;

  // first delete the memberlist
  let sql = `
    DELETE FROM memberlist
    WHERE project_id = ${projectId}`;
  
  await db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      // next();
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

projectsController.getBugs = async (req, res, next) => {
  const {projectId, limit, offset} = req.params;

  const limitClause = (limit === undefined) ? '' : `LIMIT ${limit}`;
  const offsetClause = (offset === undefined) ? '' : `OFFSET ${offset}`;
  
  const sql = `
    SELECT *
    FROM bugs
    WHERE project_id = ${projectId}
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

projectsController.getBugsCount = async (req, res, next) => {
  const {projectId} = req.params;

  const sql = `
    SELECT COUNT(*)
    FROM bugs
    WHERE project_id = ${projectId}`;

  db.query(sql)
    .then(results => {
      res.locals.data = results.rows;
      next();
    })
    .catch(error => next(error));     
};

module.exports = projectsController;
