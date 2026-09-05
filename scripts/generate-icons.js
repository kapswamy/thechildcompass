import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceLogo = path.join(rootDir, 'assets', 'logo-emblem.png');
const resDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');

async function generate() {
  console.log('🎨 Generating Android & Play Store Icons from assets/logo-emblem.png...');

  if (!fs.existsSync(sourceLogo)) {
    throw new Error(`Logo not found at: ${sourceLogo}`);
  }

  const baseImage = await Jimp.read(sourceLogo);

  // 1. Google Play Store 512x512 icon
  const playStoreIcon = baseImage.clone();
  playStoreIcon.resize({ w: 512, h: 512 });
  const playStorePath = path.join(rootDir, 'play-store-icon-512.png');
  await playStoreIcon.write(playStorePath);
  console.log(`  ✓ Generated Play Store icon (512x512): play-store-icon-512.png`);

  // 2. Android Density Configurations
  const densities = [
    { name: 'mipmap-mdpi', size: 48, fgSize: 108 },
    { name: 'mipmap-hdpi', size: 72, fgSize: 162 },
    { name: 'mipmap-xhdpi', size: 96, fgSize: 216 },
    { name: 'mipmap-xxhdpi', size: 144, fgSize: 324 },
    { name: 'mipmap-xxxhdpi', size: 192, fgSize: 432 }
  ];

  for (const { name, size, fgSize } of densities) {
    const targetDir = path.join(resDir, name);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Standard square launcher
    const launcher = baseImage.clone();
    launcher.resize({ w: size, h: size });
    await launcher.write(path.join(targetDir, 'ic_launcher.png'));

    // Round launcher
    const launcherRound = baseImage.clone();
    launcherRound.resize({ w: size, h: size });
    await launcherRound.write(path.join(targetDir, 'ic_launcher_round.png'));

    // Adaptive icon foreground: place logo scaled inside transparent canvas (safe zone ~65%)
    const logoScale = Math.round(fgSize * 0.68);
    const scaledLogo = baseImage.clone();
    scaledLogo.resize({ w: logoScale, h: logoScale });

    const foregroundCanvas = new Jimp({ width: fgSize, height: fgSize, color: 0x00000000 });
    const offset = Math.round((fgSize - logoScale) / 2);
    foregroundCanvas.composite(scaledLogo, offset, offset);

    await foregroundCanvas.write(path.join(targetDir, 'ic_launcher_foreground.png'));

    console.log(`  ✓ Generated ${name} icons (${size}x${size}, fg ${fgSize}x${fgSize})`);
  }

  console.log('✅ All Android launcher and Play Store icons generated successfully!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
