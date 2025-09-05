import { rmSync } from 'fs';
import { resolve } from 'path';

const paths = [
  'node_modules/.vite',
  '.vite',
  'dist'
];

paths.forEach(path => {
  try {
    rmSync(resolve(path), { recursive: true, force: true });
    console.log(`✓ Cleared ${path}`);
  } catch (err) {
    console.log(`- ${path} not found`);
  }
});

console.log('Cache cleared! Run npm run dev to restart.');