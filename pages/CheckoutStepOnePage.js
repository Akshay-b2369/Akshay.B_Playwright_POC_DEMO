// pages/CheckoutStepOnePage.js
const { expect } = require('@playwright/test');

class CheckoutStepOnePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://www.saucedemo.com/checkout-step-one.html';

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
  }

  async assertPageDisplayed() {
    await expect(this.page).toHaveURL(this.url);
  }

  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }
}

module.exports = { CheckoutStepOnePage };
