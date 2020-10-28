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
});
