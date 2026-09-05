import { test, expect } from '@playwright/test';

test.describe('Sunday Consultation & Appointment Timings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('displays Sunday 10 AM to 6 PM in Consultation Hours section', async ({ page }) => {
    const branchSection = page.locator('#branch-info');
    await expect(branchSection).toBeVisible();

    // Check Consultation & Visiting Hours
    const hoursTable = branchSection.locator('.hours-table');
    await expect(hoursTable).toBeVisible();
    await expect(hoursTable).toContainText('Sunday');
    await expect(hoursTable).toContainText('10:00 AM – 06:00 PM');
    await expect(hoursTable).toContainText('Monday – Saturday');
    await expect(hoursTable).toContainText('Closed for Routine Walk-ins');
  });

  test('displays Sunday schedule notice in appointment booking section', async ({ page }) => {
    const bookingSection = page.locator('#booking');
    await expect(bookingSection).toBeVisible();

    const timingAlert = bookingSection.locator('.booking-timing-alert');
    await expect(timingAlert).toBeVisible();
    await expect(timingAlert).toContainText('exclusively on Sundays (10:00 AM – 06:00 PM)');
  });

  test('has correct Sunday time slots in appointment form', async ({ page }) => {
    const timeSelect = page.locator('#preferred-time');
    await expect(timeSelect).toBeVisible();

    const options = await timeSelect.locator('option').allTextContents();
    expect(options).toContain('Morning (10:00 AM – 12:00 PM)');
    expect(options).toContain('Midday (12:00 PM – 02:00 PM)');
    expect(options).toContain('Afternoon (02:00 PM – 04:00 PM)');
    expect(options).toContain('Evening (04:00 PM – 06:00 PM)');
  });

  test('validates date input to only allow Sundays', async ({ page }) => {
    // Fill in basic details
    await page.locator('#parent-name').fill('Ananya Rao');
    await page.locator('#parent-phone').fill('9876543210');
    await page.locator('#child-name').fill('Ishaan, 1 year');
    await page.locator('#visit-purpose').selectOption('General Pediatric Consultation');
    await page.locator('#preferred-time').selectOption('Morning (10:00 AM – 12:00 PM)');

    // Choose a Monday (e.g. 2026-09-07)
    await page.locator('#preferred-date').fill('2026-09-07');
    await page.locator('#preferred-date').dispatchEvent('change');

    // Error should be shown
    const dateError = page.locator('#preferred-date-error');
    await expect(dateError).toBeVisible();
    await expect(dateError).toContainText('Sundays only');

    // Attempting submit should stay blocked
    await page.locator('#submit-booking-btn').click();
    await expect(page.locator('#booking-success')).toBeHidden();

    // Now choose a Sunday (e.g. 2026-09-06)
    await page.locator('#preferred-date').fill('2026-09-06');
    await page.locator('#preferred-date').dispatchEvent('change');
    await expect(dateError).toBeHidden();

    // Now submit
    await page.locator('#submit-booking-btn').click();
    const successBox = page.locator('#booking-success');
    await expect(successBox).toBeVisible();
    await expect(page.locator('#success-summary')).toContainText('Sunday (2026-09-06)');
    await expect(page.locator('#success-summary')).toContainText('Morning (10:00 AM – 12:00 PM)');
  });
});
