// server.js
const express = require('express');
const cors = require('cors');
const { Worker } = require('worker_threads');
const fakeProducts = require('./product');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  console.log('🔄 ERP GET /products');
  res.json({ products: fakeProducts });
});

app.get('/get-token', (req, res) => {
  res.json({ token: 'fake-token-123' });
});

app.post('/products', (req, res) => {
  console.log('🔄 ERP POST /products triggered:', req.body);
  const product = req.body;
  console.log('📦 ERP received product:', product);
  res.status(200).send({ success: true });
});

app.post('/sync', (req, res) => {
  console.log('🔄 ERP POST /sync triggered:', req.body);
  res.status(200).json({ synced: true });
});

// Start worker
const worker = new Worker('./worker.js');

worker.on('message', (msg) => {
  console.log('✅ [Worker Message]:', msg);
});

worker.on('error', (err) => {
  console.error('❌ Worker Error:', err);
});

worker.on('exit', (code) => {
  console.log('👋 Worker exited with code', code);
});

app.use(express.static('public'));

app.listen(4001, () => {
  console.log('🚀 Fake ERP server running on http://localhost:4001');
});
