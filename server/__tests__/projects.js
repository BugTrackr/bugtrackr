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

  // delete project
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

});
