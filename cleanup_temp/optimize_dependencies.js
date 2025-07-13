// This script analyzes the package.json and recommends which dependencies can be moved to devDependencies
// or removed entirely to reduce the project size.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Read the package.json
const packageJson = require('../package.json');

// Categorize dependencies
const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};
const allDeps = { ...dependencies, ...devDependencies };

console.log('Current dependency count:');
console.log(`- dependencies: ${Object.keys(dependencies).length}`);
console.log(`- devDependencies: ${Object.keys(devDependencies).length}`);
console.log('\n');

// Identify UI library components that could be moved to a separate package
const uiLibraries = Object.keys(allDeps).filter(dep => 
  dep.includes('@radix-ui/') || 
  dep.includes('ui-') || 
  dep.includes('-ui')
);

console.log(`UI Libraries that could be consolidated: ${uiLibraries.length}`);
console.log(uiLibraries.join(', '));
console.log('\n');

// Suggest optimization
console.log('Optimization suggestions:');
console.log('1. Consider keeping only the production dependencies needed for your Next.js application');
console.log('2. Move UI components to a separate package or keep them in your source code');
console.log('3. Use Next.js built-in features instead of separate libraries where possible');
console.log('\n');

// Create an optimized package.json for the Next.js deployment
const nextPackageJson = {
  name: "enneagram-test",
  version: "1.0.0",
  private: true,
  scripts: {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  dependencies: {
    "@react-pdf/renderer": dependencies["@react-pdf/renderer"] || "^4.2.2",
    "next": "14.1.4",
    "react": dependencies.react || "^18.3.1",
    "react-dom": dependencies["react-dom"] || "^18.3.1",
    "react-hook-form": dependencies["react-hook-form"] || "^7.53.1",
    "tailwind-merge": dependencies["tailwind-merge"] || "^2.5.4"
  },
  devDependencies: {
    "@types/node": devDependencies["@types/node"] || "^20.16.11",
    "@types/react": devDependencies["@types/react"] || "^18.3.11",
    "@types/react-dom": devDependencies["@types/react-dom"] || "^18.3.1",
    "autoprefixer": devDependencies.autoprefixer || "^10.4.20",
    "postcss": devDependencies.postcss || "^8.4.47",
    "tailwindcss": devDependencies.tailwindcss || "^3.4.14",
    "typescript": devDependencies.typescript || "^5.6.3"
  }
};

// Write the optimized package.json to a file
fs.writeFileSync(
  path.join(__dirname, 'optimized-package.json'), 
  JSON.stringify(nextPackageJson, null, 2)
);

console.log('Created optimized package.json in cleanup_temp/optimized-package.json');
console.log('Next steps:');
console.log('1. Review and adopt the optimized package.json');
console.log('2. Run "npm prune" to remove unused dependencies');
console.log('3. Consider using "npm ci" instead of "npm install" for cleaner installations');