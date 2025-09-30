const express = require('express');
const app = express();
app.use(express.json());

let products = [{ sku: 'x', name: 'Produto X', price: 10.0, stock: 5 }];
let users = [{ id: 1, email: 'u@test', password: 'p' }];

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) return res.status(401).json({ message: 'Unauthorized' });
  return res.json({ access_token: 'fake-token-for-tests', user: { id: u.id, email: u.email } });
});

app.post('/admin/products', (req, res) => {
  const p = req.body;
  products.push(p);
  res.status(201).json(p);
});

app.get('/products/:sku', (req, res) => {
  const p = products.find(x => x.sku === req.params.sku);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

app.post('/orders', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });
  const { items } = req.body;
  for (const it of items) {
    const p = products.find(x => x.sku === it.sku);
    if (!p) return res.status(400).json({ message: `Product ${it.sku} not found` });
    if (p.stock < it.qty) return res.status(409).json({ message: 'Insufficient stock' });
    p.stock -= it.qty;
  }
  res.status(201).json({ id: Date.now(), status: 'pending' });
});

module.exports = app;