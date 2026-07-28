// pages/CartPage.js
const { expect } = require('@playwright/test');

class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://www.saucedemo.com/cart.html';

    this.cartItems = page.locator('.cart_item');
    this.itemName = '.inventory_item_name';
    this.itemPrice = '.inventory_item_price';
    this.checkoutButton = page.locator('#checkout');
  }

  async assertPageDisplayed() {
    await expect(this.page).toHaveURL(this.url);
  }

  async assertItemCount(expectedCount) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  /**
   * Reads all product names and prices currently in the cart.
   * @returns {Promise<Array<{name: string, price: number}>>}
   */
  async getCartProducts() {
    const count = await this.cartItems.count();
    const products = [];

    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator(this.itemName).innerText();
      const priceText = await item.locator(this.itemPrice).innerText();
      const price = parseFloat(priceText.replace('$', ''));
      products.push({ name, price });
    }

    return products;
  }

  /**
   * Verifies that the cart contents match the expected products
   * (name and price) captured earlier, e.g. from the Inventory page.
   * @param {Array<{name: string, price: number}>} expectedProducts
   */
  async assertProductsMatch(expectedProducts) {
    const cartProducts = await this.getCartProducts();

    for (const expected of expectedProducts) {
      const match = cartProducts.find((p) => p.name === expected.name);
      expect(match, `Expected "${expected.name}" to be in the cart`).toBeTruthy();
      expect(match.price).toBe(expected.price);
    }
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
