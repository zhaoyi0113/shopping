const sku = {
  IPD: 'ipd',
  MBP: 'mbp',
  ATV: 'atv',
  VGA: 'vga'
};

const products = [
  {
    sku: sku.IPD,
    name: 'Super iPad',
    price: 549.99
  },
  {
    sku: sku.MBP,
    name: 'MacBook Pro',
    price: 1399.99
  },
  {
    sku: sku.ATV,
    name: 'Apple TV',
    price: 109.5
  },
  {
    sku: sku.VGA,
    name: 'VGA adapter',
    price: 30
  }
];

module.exports = { products, sku };

