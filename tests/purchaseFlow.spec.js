// tests/purchaseFlow.spec.js
const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage } = require('../pages/CheckoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/CheckoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');

const VALID_USERNAME = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('SauceDemo - End-to-End Purchase Flow', () => {
  let loginPage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage;
  let selectedProducts; // { lowest, highest }

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test('Test Case 1 - Login with valid credentials redirects to Inventory page', async () => {
    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await loginPage.assertLoginSuccessful();
  });

  test('Full purchase flow: login -> inventory -> cart -> checkout -> complete', async () => {
    // Test Case 1 - Login
    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await loginPage.assertLoginSuccessful();

    // Test Case 2 - Inventory Page Validation
    await inventoryPage.assertPageDisplayed();
    await inventoryPage.assertProductCount(6);

    selectedProducts = await inventoryPage.addLowestAndHighestPricedToCart();
    console.log('Lowest priced product:', selectedProducts.lowest);
    console.log('Highest priced product:', selectedProducts.highest);

    await inventoryPage.assertCartCount(2);
    await inventoryPage.goToCart();

    // Test Case 3 - Cart Validation
    await cartPage.assertPageDisplayed();
    await cartPage.assertItemCount(2);
    await cartPage.assertProductsMatch([selectedProducts.lowest, selectedProducts.highest]);
    await cartPage.checkout();

    // Test Case 4 - Checkout Step One
    await checkoutStepOnePage.assertPageDisplayed();
    await checkoutStepOnePage.fillCustomerInfo('Akshay', 'B', '600001');
    await checkoutStepOnePage.continueToOverview();

    // Test Case 5 - Checkout Step Two
    await checkoutStepTwoPage.assertPageDisplayed();
    await checkoutStepTwoPage.assertProductsMatch([selectedProducts.lowest, selectedProducts.highest]);
    await checkoutStepTwoPage.assertSubtotalMatches([selectedProducts.lowest, selectedProducts.highest]); // optional
    await checkoutStepTwoPage.finish();

    // Test Case 6 - Checkout Complete
    await checkoutCompletePage.assertPageDisplayed();
    await checkoutCompletePage.assertOrderSuccessMessage();
  });
});
