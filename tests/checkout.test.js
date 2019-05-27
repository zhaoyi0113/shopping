const assert = require('assert');
const { sku, pricingRules, Checkout, products } = require('../src');

describe('checkout test suite', () => {
  let checkout = null;

  beforeEach(() => {
    checkout = new Checkout(pricingRules);
  });

  test('should get 0 if no item checkout', () => {
    assert.equal(checkout.total(), 0);
  });

  test('should get two prices of apple TV if buy three', () => {
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    assert.equal(checkout.total(), 219);

    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    assert.equal(checkout.total(), 547.5);
  });

  test('should not get any discount if buy less than 3 apple TV', () => {
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    const total = checkout.total();
    assert.equal(total, 219);
  });

  test('should not get any discount if buy a Mac pro', () => {
    checkout.scan(sku.MBP);
    const total = checkout.total();
    assert.equal(total, 1399.99);
  });

  test('should not get any discount if buy a vga', () => {
    checkout.scan(sku.VGA);
    const total = checkout.total();
    assert.equal(total, 30);
  });

  test('should not get any discount if buy iPad', () => {
    checkout.scan(sku.IPD);
    const total = checkout.total();
    assert.equal(total, 549.99);
  });

  test('should get 499.99 each if buy more than 4 iPads', () => {
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    assert.equal(checkout.total(), 2499.95);
  });

  test('should not get discount if buy less or equal than 4 iPads', () => {
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    assert.equal(checkout.total(), 2199.96);
  });

  test('should get a free VGA for every Mac', () => {
    checkout.scan(sku.VGA);
    checkout.scan(sku.MBP);
    assert.equal(checkout.total(), 1399.99);

    checkout.scan(sku.VGA);
    checkout.scan(sku.MBP);
    checkout.scan(sku.MBP);
    assert.equal(checkout.total(), 2799.98);

    checkout.scan(sku.VGA);
    checkout.scan(sku.VGA);
    checkout.scan(sku.MBP);
    assert.equal(checkout.total(), 1429.99);

    checkout.scan(sku.VGA);
    checkout.scan(sku.VGA);
    checkout.scan(sku.VGA);
    checkout.scan(sku.MBP);
    checkout.scan(sku.MBP);
    checkout.scan(sku.MBP);
    assert.equal(checkout.total(), 4199.97);
  });

  test('checkout combined items without discount', () => {
    checkout.scan(sku.VGA);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.ATV);
    assert.equal(checkout.total(), 1239.48);

    checkout.scan(sku.IPD);
    checkout.scan(sku.ATV);
    checkout.scan(sku.MBP);
    checkout.scan(sku.MBP);
    checkout.scan(sku.MBP);
    assert.equal(checkout.total(), 4859.46);
  });

  test('checkout combined items with discount', () => {
    checkout.scan(sku.VGA);
    checkout.scan(sku.VGA);
    checkout.scan(sku.MBP);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    assert.equal(checkout.total(), 2748.97);

    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.ATV);
    checkout.scan(sku.VGA);
    assert.equal(checkout.total(), 249);

    checkout.scan(sku.ATV);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.ATV);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    checkout.scan(sku.IPD);
    assert.equal(checkout.total(), 2718.95);

    checkout.scan(sku.MBP);
    checkout.scan(sku.VGA);
    checkout.scan(sku.IPD);
    assert.equal(checkout.total(), 1949.98);
  });
});
