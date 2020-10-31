const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

describe('bugs supertests', () => {

  it('get all Status values', async (done) => {
    const response = await request.get('/bugs/getAllStatus');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 1,
          "status": "OPEN"
      },
      {
          "id": 2,
          "status": "PENDING"
      },
      {
          "id": 3,
          "status": "RESOLVED"
      }
    ]);
    done();
  });

  let bugId;
  it('creates a bug', async (done) => {
    const response = await request.post('/bugs/create')
    .send({
      userId: 9999,
      description: 'new bug',
      assigned_to: 9999,
      projectId: 9999,
      status: 1
    })
    .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    bugId = response.body[0].id;
    expect(response.body).toEqual([
      {
        id: bugId,
        project_id: 9999,
        author: 9999,
        assigned_to: 9999,
        description: 'new bug',
        status: 1
      }
    ]);
    done();
  });

  it('get bug details', async (done) => {
    const response = await request.get(`/bugs/${bugId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: bugId,
        project_id: 9999,
        author: 9999,
        assigned_to: 9999,
        description: 'new bug',
        status: 1
      }
    ]);
    done();
  });

  it('update bug details', async (done) => {
    const response = await request.post('/bugs/update')
    .send({
      bugId: bugId,
      projectId: 9999,
      description: 'new description',
      status: 2
    })
    .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: bugId,
        project_id: 9999,
        author: 9999,
        assigned_to: 9999,
        description: 'new description',
        status: 2
      }
    ]);
    done();
  });

  it('resolves a bug', async (done) => {
    const response = await request.post('/bugs/resolve')
    .send({
      bugId: bugId,
      status: 3
    })
    .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: bugId,
        project_id: 9999,
        author: 9999,
        assigned_to: 9999,
        description: 'new description',
        status: 3
      }
    ]);
    done();
  });

  it('deletes a bug', async (done) => {
    const response = await request.delete('/bugs/delete')
    .send({
      bugId: bugId,
    })
    .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: bugId
      }
    ]);
    done();
  });
});
