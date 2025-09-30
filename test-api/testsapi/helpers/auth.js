const request = require('supertest');
const app = require('../../../src/app');

async function loginAsTestUser() {
  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'user@test.com', password: 'user123' });
    
  if (res.status !== 200) {
    throw new Error(`login failed in helper: status=${res.status} body=${JSON.stringify(res.body)}`);
  }
  if (!res.body || !res.body.access_token) {
    throw new Error(`login helper: no access_token returned: ${JSON.stringify(res.body)}`);
  }
  return res.body.access_token;
}

module.exports = { loginAsTestUser };