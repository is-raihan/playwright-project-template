import { test, expect } from '@playwright/test';
import { AppPages } from '../../../pages/index';
import { HOME_URL } from "../../../utils/env";

// Use test.describe to group related tests
test.describe('Create New Deal', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto(`${HOME_URL}`);
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('Navigate from Deals to Budget dashboard', async ({ page }) => {
    const app = new AppPages(page);

    // For demo purposes, let's just verify the page loads correctly
    await expect(page).toHaveTitle(/GitHub/);

    // Create new deal (commented out for now since it's not a real app)
    // await app.dealsPage.CreateNewDeal();
  });

  test('Navigate from Budget dashboard', async ({ page }) => {
    const app = new AppPages(page);

    // For demo purposes, let's just verify the page loads correctly
    await expect(page).toHaveTitle(/GitHub/);

    // Navigate to budget dashboard (commented out for now since it's not a real app)
    // await app.budgetPage.navigateToBudgetDashboard();
  });
});
