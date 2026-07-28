// pages/CheckoutCompletePage.js
const { expect } = require('@playwright/test');

class CheckoutCompletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://www.saucedemo.com/checkout-complete.html';

    this.completeHeader = page.locator('.complete-header');
  }

  async assertPageDisplayed() {
    await expect(this.page).toHaveURL(this.url);
  }

  async assertOrderSuccessMessage() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

module.exports = { CheckoutCompletePage };
