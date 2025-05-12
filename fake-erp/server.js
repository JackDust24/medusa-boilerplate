const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let fakeProducts = [
  {
    id: 'erp_1',
    title: 'ERP Product A',
    description: 'A fake ERP product',
    sku: 'ERP-001',
    price: 1999,
    variants: [
      {
        title: 'variant-erp-title',
        metadata: {
          external_id: 'erp_1_1',
        },
        option_value: 'Medium',
      },
      {
        title: 'variant-erp-title-B',
        metadata: {
          external_id: 'erp_1_2',
        },
        option_value: 'Small',
      },
    ],
  },
  {
    id: 'erp_2',
    title: 'ERP Product B',
    description: 'Another fake ERP product',
    sku: 'ERP-002',
    option_value: 'Medium',
    price: 2999,
    variants: [
      {
        title: 'variant-erp2-title',
        metadata: {
          external_id: 'erp_2_1',
        },
        option_value: 'Medium',
      },
      {
        title: 'variant-erp2-title-B',
        metadata: {
          external_id: 'erp21_2',
        },
        option_value: 'Small',
      },
    ],
  },
];

app.get('/products', (req, res) => {
  console.log('🔄 ERP  GET:');

  res.json({ products: fakeProducts });
});

app.post('/products', (req, res) => {
  const product = req.body;
  console.log('📦 ERP received product:', product);
  res.status(200).send({ success: true });
});

app.post('/sync', (req, res) => {
  console.log('🔄 ERP sync triggered:', req.body);
  res.status(200).json({ synced: true });
});

app.listen(4001, () => {
  console.log('Fake ERP server running on http://localhost:4001');
});
