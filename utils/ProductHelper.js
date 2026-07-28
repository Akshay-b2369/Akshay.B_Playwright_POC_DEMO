// utils/ProductHelper.js

/**
 * Given a list of { name, price } products, returns the lowest and
 * highest priced items.
 * @param {Array<{name: string, price: number}>} products
 * @returns {{lowest: {name: string, price: number}, highest: {name: string, price: number}}}
 */
function findLowestAndHighestPriced(products) {
  if (!products || products.length === 0) {
    throw new Error('Cannot determine lowest/highest priced product from an empty list.');
  }

  let lowest = products[0];
  let highest = products[0];

  for (const product of products) {
    if (product.price < lowest.price) {
      lowest = product;
    }
    if (product.price > highest.price) {
      highest = product;
    }
  }

  return { lowest, highest };
}

module.exports = { findLowestAndHighestPriced };
