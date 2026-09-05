import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function makeFavicons() {
  const emblemPath = path.join(rootDir, 'assets', 'logo-emblem.png');
  if (!fs.existsSync(emblemPath)) {
    throw new Error('Emblem not found at ' + emblemPath);
  }

  const base = await Jimp.read(emblemPath);

  // 1. favicon-32.png
  const fav32 = base.clone();
  fav32.resize({ w: 32, h: 32 });
  await fav32.write(path.join(rootDir, 'assets', 'favicon-32.png'));
  console.log('✓ Created assets/favicon-32.png');

  // 2. favicon-192.png
  const fav192 = base.clone();
  fav192.resize({ w: 192, h: 192 });
  await fav192.write(path.join(rootDir, 'assets', 'favicon-192.png'));
  console.log('✓ Created assets/favicon-192.png');

  // 3. apple-touch-icon.png (180x180)
  const touchIcon = base.clone();
  touchIcon.resize({ w: 180, h: 180 });
  await touchIcon.write(path.join(rootDir, 'assets', 'apple-touch-icon.png'));
  console.log('✓ Created assets/apple-touch-icon.png');

  // 4. Root favicon.png (for browsers requesting /favicon.png)
  await fav32.write(path.join(rootDir, 'favicon.png'));
  console.log('✓ Created root favicon.png');
}

makeFavicons().catch(console.error);
