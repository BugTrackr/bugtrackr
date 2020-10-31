const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

describe('users supertests', () => {
  
  it('get myAssigned bugs', async (done) => {
    const response = await request.get('/users/getAssignedBugs/9999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 9999,
        project_id: 9999,
        author: 9999,
        assigned_to: 9999,
        description: 'description',
        status: 1
      }
    ]);
    done();
  });

  it('get myAssigned bugs', async (done) => {
    const response = await request.get('/users/9999/bugs/assigned_to');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 9999,
        project_id: 9999,
        author: 9999,
        assigned_to: 9999,
        description: 'description',
        status: 1
      }
    ]);
    done();
  });

  it('get myAssigned bugs count', async (done) => {
    const response = await request.get('/users/9999/bugs/assigned_to/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });

  it('get myAssigned bugs count', async (done) => {
    const response = await request.get('/users/getAssignedBugsCount/9999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });

  it('get my member projects', async (done) => {
    const response = await request.get('/users/getProjects/9999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 9999,
          "name": "Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  it('get my member projects', async (done) => {
    const response = await request.get('/users/9999/projects/member');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 9999,
          "name": "Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  it('get number of member projects', async (done) => {
    const response = await request.get('/users/9999/projects/member/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });

  it('get number of member projects', async (done) => {
    const response = await request.get('/users/getProjectsCount/9999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });


  it('get my member projects', async (done) => {
    const response = await request.get('/users/9999/projects');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 9999,
          "name": "Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  it('get number of member projects', async (done) => {
    const response = await request.get('/users/9999/projects/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });


  
  it('get all users', async (done) => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 1,
          "username": "steve"
      },
      {
          "id": 9999,
          "username": "test"
      },
      {
          "id": 2,
          "username": "umar"
      },
      {
          "id": 3,
          "username": "matt"
      },
      {
          "id": 4,
          "username": "mariya"
      }
    ]);
    done();
  });

  it('get all users', async (done) => {
    const response = await request.get('/users/getAllUsers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 1,
          "username": "steve"
      },
      {
          "id": 9999,
          "username": "test"
      },
      {
          "id": 2,
          "username": "umar"
      },
      {
          "id": 3,
          "username": "matt"
      },
      {
          "id": 4,
          "username": "mariya"
      }
    ]);
    done();
  });

  it('get number of users', async (done) => {
    const response = await request.get('/users/getAllUsersCount');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "5"
      }
    ]);
    done();
  });

  it('get number of users', async (done) => {
    const response = await request.get('/users/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "5"
      }
    ]);
    done();
  });


  it('get bugs authored', async (done) => {
    const response = await request.get('/users/9999/bugs/author');
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

  it('get number of bugs authored', async (done) => {
    const response = await request.get('/users/9999/bugs/author/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });


  it('get bugs assigned or authored', async (done) => {
    const response = await request.get('/users/9999/bugs');
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

  it('get number of bugs assigned or authored', async (done) => {
    const response = await request.get('/users/9999/bugs/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });

  it('get projects owned', async (done) => {
    const response = await request.get('/users/9999/projects/owner');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 9999,
          "name": "Test Project",
          "owner": 9999
      }
    ]);
    done();
  });

  it('get number of projects owned', async (done) => {
    const response = await request.get('/users/9999/projects/owner/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "count": "1"
      }
    ]);
    done();
  });

  it('get details for a user', async (done) => {
    const response = await request.get('/users/9999');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
          "id": 9999,
          "username": "test"
      }
    ]);
    done();
  });


  it('get details for a bad userId', async (done) => {
    const response = await request.get('/users/baduserid');
    expect(response.status).toBe(500);
    done();
  });

});
