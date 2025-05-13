// product.js
const fakeProducts = [
  {
    id: 'erp_12',
    title: 'ERP Product HEELLPE',
    description: 'A fake ERP product',
    sku: 'ERP-0012',
    price: 12111111,
    variants: [
      {
        title: 'variant-erp-title',
        metadata: { external_id: 'erp_12_1' },
        option_value: 'Medium',
      },
      {
        title: 'variant-erp-title-B',
        metadata: { external_id: 'erp_12_2' },
        option_value: 'Small',
      },
    ],
  },
  {
    id: 'erp_11',
    title: 'ERP Product WET RRUNN',
    description: 'Another fake ERP product',
    sku: 'ERP-0011',
    price: 11111211,
    variants: [
      {
        title: 'variant-erp11-title',
        metadata: { external_id: 'erp_11_1' },
        option_value: 'Medium',
      },
      {
        title: 'variant-erp11-title-B',
        metadata: { external_id: 'erp111_2' },
        option_value: 'Small',
      },
    ],
  },
];

module.exports = fakeProducts;
