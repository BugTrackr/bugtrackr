const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

describe('projects supertests', () => {

  // getAllProjects
  it('get all projects', async (done) => {
    const response = await request.get('/projects/getAllProjects');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 1,
          "name": "BugTrackr",
          "owner": 1
      },
      {
          "id": 9999,
          "name": "Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  it('get all projects', async (done) => {
    const response = await request.get('/projects');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 1,
          "name": "BugTrackr",
          "owner": 1
      },
      {
          "id": 9999,
          "name": "Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  // getMembers
  it('get members for a project', async (done) => {
    const response = await request.get('/projects/getMembers/9999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "project_id": 9999,
          "project_name": "Test Project",
          "user_id": 1,
          "username": "steve"
      },
      {
          "project_id": 9999,
          "project_name": "Test Project",
          "user_id": 9999,
          "username": "test"
      }
    ]);
    done();
  });

  it('get members for a project', async (done) => {
    const response = await request.get('/projects/9999/members');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "project_id": 9999,
          "project_name": "Test Project",
          "user_id": 1,
          "username": "steve"
      },
      {
          "project_id": 9999,
          "project_name": "Test Project",
          "user_id": 9999,
          "username": "test"
      }
    ]);
    done();
  });

  // addMember
  let newMemberId;
  it('add member to a project', async (done) => {
    const response = await request.post('/projects/addMember')
      .send({
        userId: 2,
        projectId: 9999
      })
      .set('Accept', 'application/json');
    newMemberId = response.body[0].id;
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": newMemberId,
          "project_id": 9999,
          "user_id": 2
      }
    ]);
    done();
  });

  // removeMember
  it('delete member from a project', async (done) => {
    const response = await request.delete('/projects/removeMember')
      .send({
        userId: 2,
        projectId: 9999
      })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "user_id": 2,
      }
    ]);
    done();
  });

  // create
  let newProjectId;
  it('creates a new project', async (done) => {
    const response = await request.post('/projects/create')
      .send({
        name: "New Test Project",
        owner: 9999,
        users: [9999]
      })
      .set('Accept', 'application/json');
    newProjectId = response.body[0].id;
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": newProjectId,
          "name": "New Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  // updateMembers
  it('updates members for a project', async (done) => {
    const response = await request.post('/projects/updateMembers')
      .send({
        projectId: newProjectId,
        members: [1, 9999]
      })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body[0].user_id).toEqual(1);
    expect(response.body[1].user_id).toEqual(9999);
    done();
  });
  
  // get project details
  it('gets details for a project', async (done) => {
    const response = await request.get(`/projects/${newProjectId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": newProjectId,
          "name": "New Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  // update project
  it('updates details for project', async (done) => {
    const response = await request.post('/projects/update')
      .send({
        projectId: newProjectId,
        name: "Updated Test Project",
        owner: 9999,
      })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": newProjectId,
          "name": "Updated Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  // delete a project
  it('deletes a project', async (done) => {
    const response = await request.delete('/projects/delete')
      .send({
        projectId: newProjectId,
      })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": newProjectId,
      }
    ]);
    done();
  });

  it('deletes a project', async (done) => {
    let response = await request.post('/projects/create')
      .send({
        name: "New Test Project",
        owner: 9999,
        users: [9999]
      })
      .set('Accept', 'application/json');
    newProjectId = response.body[0].id;
  
  response = await request.delete(`/projects/${newProjectId}`)
      .send({
        projectId: newProjectId,
      })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": newProjectId,
      }
    ]);
    done();
  });



  it('get number of bugs for a project', async (done) => {
    const response = await request.get('/projects/getBugsCount/9999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });

  it('get number of bugs for a project', async (done) => {
    const response = await request.get('/projects/9999/bugs/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });

  it('get all the bugs for a project', async (done) => {
    const response = await request.get('/projects/getBugs/9999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 9999,
          "project_id": 9999,
          "author": 9999,
          "assigned_to": 9999,
          "description": "description",
          "status": 1
      }
    ]);
    done();
  });

  it('get all the bugs for a project', async (done) => {
    const response = await request.get('/projects/9999/bugs');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 9999,
          "project_id": 9999,
          "author": 9999,
          "assigned_to": 9999,
          "description": "description",
          "status": 1
      }
    ]);
    done();
  });


  it('get total number of projects', async (done) => {
    const response = await request.get('/projects/getAllProjectsCount');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "2"
      }
    ]);
    done();
  });

  it('get total number of projects', async (done) => {
    const response = await request.get('/projects/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "2"
      }
    ]);
    done();
  });



});
