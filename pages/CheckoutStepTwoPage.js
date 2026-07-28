// pages/CheckoutStepTwoPage.js
const { expect } = require('@playwright/test');

class CheckoutStepTwoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://www.saucedemo.com/checkout-step-two.html';

    this.cartItems = page.locator('.cart_item');
    this.itemName = '.inventory_item_name';
    this.itemPrice = '.inventory_item_price';
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
  }

  async assertPageDisplayed() {
    await expect(this.page).toHaveURL(this.url);
  }

  /**
   * @returns {Promise<Array<{name: string, price: number}>>}
   */
  async getOrderProducts() {
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

  async assertProductsMatch(expectedProducts) {
    const orderProducts = await this.getOrderProducts();

    for (const expected of expectedProducts) {
      const match = orderProducts.find((p) => p.name === expected.name);
      expect(match, `Expected "${expected.name}" in order summary`).toBeTruthy();
      expect(match.price).toBe(expected.price);
    }
  }

  /**
   * Optional: verifies the item total (subtotal, excl. tax) matches
   * the sum of the expected product prices.
   */
  async assertSubtotalMatches(expectedProducts) {
    const expectedSubtotal = expectedProducts.reduce((sum, p) => sum + p.price, 0);
    const subtotalText = await this.subtotalLabel.innerText(); // "Item total: $X.XX"
    const actualSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
  }

  async finish() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutStepTwoPage };
