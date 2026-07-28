# SauceDemo Playwright POC

Automated end-to-end purchase flow for [SauceDemo](https://www.saucedemo.com/),
built with **Playwright (JavaScript)** using the **Page Object Model (POM)**.

## Flow Covered

Login → Inventory (dynamic lowest/highest price selection) → Cart validation
→ Checkout Step One → Checkout Step Two (order summary validation) →
Checkout Complete.

## Project Structure

```
Project
│
├── tests
│   └── purchaseFlow.spec.js
│
├── pages
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutStepOnePage.js
│   ├── CheckoutStepTwoPage.js
│   └── CheckoutCompletePage.js
│
├── utils
│   └── ProductHelper.js
│
├── playwright.config.js
├── package.json
└── README.md
```

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests (all browsers, headless)
npm test

# Run in headed mode (see the browser)
npm run test:headed

# Run against a single browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# View the HTML report after a run
npm run report
```

## Test Credentials

| Field    | Value           |
|----------|-----------------|
| Username | standard_user   |
| Password | secret_sauce    |

## Notes

- Product selection on the Inventory page is **dynamic** — the framework
  reads all 6 product prices at runtime and adds the lowest and highest
  priced items to the cart, rather than hardcoding product names.
- Every page transition is followed by a URL assertion.
- Cart and Checkout Step Two both validate that product names/prices match
  what was captured on the Inventory page.
- Subtotal validation on Checkout Step Two is included as an optional check.
