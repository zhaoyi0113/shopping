const { sku } = require('./products');

/**
 * we're going to have a 3 for 2 deal on Apple TVs. For example,
 * if you buy 3 Apple TVs, you will pay the price of 2 only
 */
const appleTVs = (items) => {
  const atvs = items.filter(item => item.sku === sku.ATV);
  if (atvs.length === 0) {
    return 0;
  }
  const numOf3ATV = parseInt(atvs.length / 3, 10);
  return -(numOf3ATV * atvs[0].price);
};

/**
 * the brand new Super iPad will have a bulk discounted applied, where the price will
 * drop to $499.99 each, if someone buys more than 4
 */
const iPadBulkSaving = (items) => {
  const ipads = items.filter(item => item.sku === sku.IPD);
  if (ipads.length > 4) {
    return -(ipads.length * (ipads[0].price - 499.99));
  }
  return 0;
};

/**
 * we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
 */
const freeVGAWithMac = (items) => {
  const macs = items.filter(item => item.sku === sku.MBP);
  const vga = items.filter(item => item.sku === sku.VGA);
  const min = Math.min(macs.length, vga.length);
  if (min > 0) {
    return -(min * vga[0].price);
  }
  return 0;
};

const pricingRules = [appleTVs, iPadBulkSaving, freeVGAWithMac];

module.exports = { pricingRules };
