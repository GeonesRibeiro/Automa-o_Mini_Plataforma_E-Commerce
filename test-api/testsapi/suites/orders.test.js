const request = require('supertest');
const app = 'http://localhost:3001'; // seu servidor local

describe('E2E - Fluxo completo de compra', () => {
  let token;
  let productId;

  beforeAll(async () => {
    // Login do usuário
    const loginRes = await request(app)
      .post('/api/login')
      .send({ email: 'user@test.com', password: 'user123' })
      .expect(200);

    token = loginRes.body.token;
    expect(token).toBeDefined();

    // Verifica se o token funciona na rota /api/me
    const meRes = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(meRes.body.user).toMatchObject({
      email: 'user@test.com',
      name: 'Regular User'
    });
  });

  test('Listar produtos e capturar ID', async () => {
    const res = await request(app)
      .get('/api/products')
      .expect(200);

    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBeGreaterThan(0);

    productId = res.body.items[0].id;
    expect(productId).toBeDefined();
  });

  test('Validar cupom de desconto', async () => {
    const res = await request(app)
      .post('/api/validate-coupon')
      .send({ code: 'WELCOME10' })
      .expect(200);

    expect(res.body.valid).toBe(true);
    expect(res.body.coupon).toHaveProperty('code', 'WELCOME10');
  });

  test('Finalizar checkout com produto e cupom', async () => {
    const res = await request(app)
      .post('/api/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ id: productId, qty: 2 }],
        couponCode: 'WELCOME10'
      })
      .expect(200); // alterado de 201 para 200

    expect(res.body).toHaveProperty('orderId');
    expect(res.body).toHaveProperty('total');
  });

  test('Logout do usuário', async () => {
    await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
