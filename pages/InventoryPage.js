// pages/InventoryPage.js
const { expect } = require('@playwright/test');
const { findLowestAndHighestPriced } = require('../utils/ProductHelper');

class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://www.saucedemo.com/inventory.html';

    this.inventoryItems = page.locator('.inventory_item');
    this.itemName = '.inventory_item_name';
    this.itemPrice = '.inventory_item_price';
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async assertPageDisplayed() {
    await expect(this.page).toHaveURL(this.url);
  }

  async assertProductCount(expectedCount) {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  /**
   * Reads all product names and prices from the inventory page.
   * @returns {Promise<Array<{name: string, price: number}>>}
   */
  async getAllProducts() {
    const count = await this.inventoryItems.count();
    const products = [];

    for (let i = 0; i < count; i++) {
      const item = this.inventoryItems.nth(i);
      const name = await item.locator(this.itemName).innerText();
      const priceText = await item.locator(this.itemPrice).innerText();
      const price = parseFloat(priceText.replace('$', ''));
      products.push({ name, price });
    }

    return products;
  }

  /**
   * Adds a product to the cart by its visible name.
   * @param {string} productName
   */
  async addProductToCart(productName) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button', { hasText: 'Add to cart' }).click();
  }

  /**
   * Finds the lowest and highest priced products and adds both to cart.
   * @returns {Promise<{lowest: {name: string, price: number}, highest: {name: string, price: number}}>}
   */
  async addLowestAndHighestPricedToCart() {
    const products = await this.getAllProducts();
    const { lowest, highest } = findLowestAndHighestPriced(products);

    await this.addProductToCart(lowest.name);
    await this.addProductToCart(highest.name);

    return { lowest, highest };
  }

  async assertCartCount(expectedCount) {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

module.exports = { InventoryPage };
