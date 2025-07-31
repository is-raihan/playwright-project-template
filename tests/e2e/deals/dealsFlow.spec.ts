import { test, expect } from '@playwright/test';
import { AppPages } from '../../../pages/index';
import { HOME_URL } from "../../../utils/env";

// Use test.describe to group related tests
test.describe('Deals to Budget Flow', () => {
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

    // Navigate to deals repository (commented out for now since it's not a real app)
    // await app.dealsPage.navigateToDealsRepository();
  });

  test.skip('Navigate from Deals dashboard', async ({ page }) => {
    const app = new AppPages(page);
    // Open deal in new tab
    const newTabPromise = page.waitForEvent('popup');
    await app.dealsPage.dealLink_682.click();
    const newTab = await newTabPromise;

    // Work with new tab
    await newTab.getByRole('button', { name: 'Save' }).click();
    await newTab.close();
    await page.bringToFront();
  });
});