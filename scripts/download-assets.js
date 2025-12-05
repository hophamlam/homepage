/**
 * Script để download assets từ GitHub repo cũ
 * Usage: node scripts/download-assets.js
 */

import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const REPO_URL = 'https://github.com/hophamlam/homepage/raw/master';
const ASSETS_DIR = 'public/assets';
const STATIC_DIR = 'public/static';

/**
 * Download file từ URL
 */
async function downloadFile(url, outputPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${url}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    await writeFile(outputPath, Buffer.from(buffer));
    console.log(`✓ Downloaded: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error downloading ${url}:`, error.message);
  }
}

/**
 * Tạo thư mục nếu chưa có
 */
async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Downloading assets from GitHub...\n');

  // Tạo thư mục
  await ensureDir(ASSETS_DIR);
  await ensureDir(STATIC_DIR);

  // TODO: Thêm các files cần download
  // Ví dụ:
  // await downloadFile(
  //   `${REPO_URL}/assets/icon.svg`,
  //   join(ASSETS_DIR, 'icon.svg')
  // );

  console.log('\nDone! Check public/assets and public/static');
}

main().catch(console.error);

