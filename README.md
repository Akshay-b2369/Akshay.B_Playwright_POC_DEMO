# SauceDemo Playwright POC

Automated end-to-end purchase flow for [SauceDemo](https://www.saucedemo.com/),
built with **Playwright (JavaScript)** using the **Page Object Model (POM)**.

## Flow Covered

Login → Inventory (dynamic lowest/highest price selection) → Cart validation
→ Checkout Step One → Checkout Step Two (order summary validation) →
Checkout Complete.

## Project Structure


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
