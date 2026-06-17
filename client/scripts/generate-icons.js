/**
 * Generate PWA icon sizes from a single source image.
 *
 * Prerequisites:
 *   1. Place your master icon at public/icons/source.png (recommended: 1024×1024 PNG)
 *   2. npm install sharp (already in devDependencies)
 *
 * Run from the client directory:
 *   node scripts/generate-icons.js
 *
 * Output: public/icons/icon-{size}x{size}.png for each required size.
 */

import sharp from 'sharp';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');
const sourcePath = join(iconsDir, 'source.png');

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

async function main() {
  if (!existsSync(sourcePath)) {
    console.error('Missing source icon at public/icons/source.png');
    console.error('Add a square PNG (1024×1024 recommended), then run this script again.');
    process.exit(1);
  }

  for (const size of SIZES) {
    const outputPath = join(iconsDir, `icon-${size}x${size}.png`);
    await sharp(sourcePath)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(outputPath);
    console.log(`Created ${outputPath}`);
  }

  console.log('Done — all PWA icons generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
