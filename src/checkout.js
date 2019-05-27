const { products } = require('./products');

class Checkout {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.items = [];
  }

  scan(sku) {
    const item = products.find(p => p.sku === sku);
    if (item) {
      this.items.push(item);
    }
  }

  total() {
    const sum = this.items.reduce(
      (accumulator, current) => accumulator + current.price,
      0
    );
    const discount = this.pricingRules.reduce(
      (accumulator, current) => accumulator + current(this.items),
      0
    );
    return parseFloat((sum + discount).toFixed(2));
  }
}

module.exports = Checkout;
