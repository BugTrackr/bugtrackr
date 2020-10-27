const usersController = require('../src/controllers/users');

describe('users tests', () => {

  const req = {
    params: {
      userId: '1',
    }
  }
  const res = {};
  const next = {};

  it('simple test', () => {
    usersController.getAssigned(req, res, next);
  })
});
