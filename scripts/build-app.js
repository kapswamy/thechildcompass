import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.resolve(rootDir, 'www');

console.log('📦 Bundling The Child Compass web assets into www/...');

// Ensure clean outDir
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// Files to copy
const filesToCopy = [
  'index.html',
  'privacy.html',
  'styles.css',
  'chat.css',
  'brand-overrides.css',
  'guide-overrides.css',
  'script.js',
  'favicon.png',
  'verifyforzoho.html'
];

for (const file of filesToCopy) {
  const src = path.join(rootDir, file);
  const dest = path.join(outDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✓ Copied ${file}`);
  } else {
    console.warn(`  ⚠️ Warning: ${file} not found at ${src}`);
  }
}

// Copy assets folder
const assetsSrc = path.join(rootDir, 'assets');
const assetsDest = path.join(outDir, 'assets');

if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, assetsDest, { recursive: true });
  console.log('  ✓ Copied assets/ directory');
}

console.log('✅ Web bundle built successfully in www/');
