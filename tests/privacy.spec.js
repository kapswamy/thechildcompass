// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Privacy Policy Page', () => {
  test('displays Privacy Policy with full regulatory disclosures', async ({ page }) => {
    await page.goto('/privacy.html');

    // Title & Main Heading
    await expect(page).toHaveTitle(/Privacy Policy — The Child Compass/);
    await expect(page.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeVisible();

    // Key required policy sections
    await expect(page.getByRole('heading', { name: /1\. Information We Collect/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /2\. How We Use Your Information/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /3\. Parent Guide AI Assistant/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /5\. Children’s Privacy Disclosures/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /7\. Your Rights & Contact Information/i })).toBeVisible();

    // Contact info
    await expect(page.getByText('Dr. Vishnuvardhan K').first()).toBeVisible();
    await expect(page.getByText('Vikarabad, Telangana').first()).toBeVisible();

    // Back to main link works
    const backBtn = page.getByRole('link', { name: /Back to Clinic Website/i });
    await expect(backBtn).toBeVisible();
  });

  test('home page footer links to privacy policy', async ({ page }) => {
    await page.goto('/');
    const privacyLinks = page.getByRole('link', { name: 'Privacy Policy' });
    await expect(privacyLinks.first()).toBeVisible();
    await expect(privacyLinks.first()).toHaveAttribute('href', 'privacy.html');
  });
});
