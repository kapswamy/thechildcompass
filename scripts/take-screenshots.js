import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function capture() {
  const browser = await chromium.launch();

  // Desktop viewport
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // 1. Home page header and brand
  await page.goto('http://localhost:3000/');
  const headerHome = await page.$('.site-header');
  if (headerHome) await headerHome.screenshot({ path: path.join(rootDir, 'final-home-header.png') });

  const brandHome = await page.$('.brand-link');
  if (brandHome) await brandHome.screenshot({ path: path.join(rootDir, 'final-home-brand.png') });

  const footerBrand = await page.$('.footer-brand-link');
  if (footerBrand) await footerBrand.screenshot({ path: path.join(rootDir, 'final-footer-brand.png') });

  // 2. Privacy page header and brand
  await page.goto('http://localhost:3000/privacy.html');
  const headerPrivacy = await page.$('.site-header');
  if (headerPrivacy) await headerPrivacy.screenshot({ path: path.join(rootDir, 'final-privacy-header.png') });

  const brandPrivacy = await page.$('.brand-link');
  if (brandPrivacy) await brandPrivacy.screenshot({ path: path.join(rootDir, 'final-privacy-brand.png') });

  // 3. Mobile viewport
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await mobilePage.goto('http://localhost:3000/');
  const mobileHeader = await mobilePage.$('.site-header');
  if (mobileHeader) await mobileHeader.screenshot({ path: path.join(rootDir, 'final-mobile-header.png') });

  await browser.close();
  console.log('Final screenshots captured successfully!');
}

capture().catch(console.error);
