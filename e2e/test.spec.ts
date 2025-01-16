import { test, expect } from '@playwright/test';

test('should display all Transactions', async ({ page }) => {
  // Navigate to the Angular app
  await page.goto('/',{ waitUntil: 'networkidle' });

  // Check for the message
  const title = await page.locator('h1');
  await expect(title).toHaveText('All Transactions');
});

test('should open Transaction history per day', async ({ page }) => {
  // Navigate to the Angular app
  await page.goto('/',{ waitUntil: 'networkidle' });

  // Function to click and wait for the panel to expand
  const expandPanel = async (index: number) => {
    const card = page.locator('[data-testid="transaction-day"]').nth(index);

    await expect(card).toBeVisible();

    await card.click();

    await expect(card).toHaveClass(/mat-expanded/, { timeout: 10000 });

    const panelContent = card.locator('.mat-expansion-panel-content');
    await expect(panelContent).toBeVisible();
  };

  await expandPanel(0);
  await expandPanel(2);
  await expandPanel(3);
});

test('should open unique Transaction', async ({ page }) => {
  // Navigate to the Angular app
  await page.goto('/',{ waitUntil: 'networkidle' });

  // Function to click and wait for the panel to expand
  const expandPanel = async (index: number) => {
    const card = page.locator('[data-testid="transaction-day"]').nth(index);

    await expect(card).toBeVisible();

    await card.click();

    await expect(card).toHaveClass(/mat-expanded/, { timeout: 10000 });

    const panelContent = card.locator('.mat-expansion-panel-content');
    await expect(panelContent).toBeVisible();
  };

  await expandPanel(0);

  const transactionCard = page.locator('[data-testid="transaction-card"]').nth(0);
  await transactionCard.click();

  const detailsCard = page.locator('[data-testid="unique-transaction"]');
  await expect(detailsCard).toHaveClass(/transaction-card/, { timeout: 10000 });
});
