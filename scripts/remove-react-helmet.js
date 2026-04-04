#!/usr/bin/env node

/**
 * Script to remove react-helmet imports and usage
 * Next.js 13+ handles metadata at the page level, not in components
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/cart/index.jsx',
  'src/components/collection/collection-offers.jsx',
  'src/components/checkout/index.jsx',
  'src/components/collection/collection-left-sidebar.jsx',
  'src/components/collection/collection-leash.jsx',
  'src/components/collection/collection-body-belt.jsx',
  'src/components/collection/collection-premium.jsx',
  'src/components/collection/collection-rope.jsx',
  'src/components/collection/collection-harness.jsx',
  'src/components/collection/collection-combo.jsx',
  'src/components/collection/collection-regular.jsx',
  'src/components/collection/collection.jsx',
  'src/components/collection/collection-mega-combo.jsx',
  'src/components/collection/collection-chain.jsx',
  'src/components/collection/collection-collar.jsx',
  'src/components/products/left-sidebar.jsx',
  'src/components/products/view-product.jsx',
  'src/components/blogs/details.jsx',
  'src/components/blogs/blog-page.jsx'
];

function removeHelmet(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠ Skipped (not found): ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  // Remove Helmet import
  const helmetImportRegex = /import\s+\{?\s*Helmet\s*\}?\s+from\s+['"]react-helmet['"]\s*;?\s*\n?/g;
  if (helmetImportRegex.test(content)) {
    content = content.replace(helmetImportRegex, '');
    modified = true;
  }
  
  // Remove Helmet JSX usage (including multiline)
  // Pattern 1: <Helmet>...</Helmet> (single or multiline)
  const helmetUsageRegex = /<Helmet>[\s\S]*?<\/Helmet>\s*/g;
  if (helmetUsageRegex.test(content)) {
    content = content.replace(helmetUsageRegex, '');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    return true;
  }
  
  console.log(`⚠ Skipped (no changes needed): ${filePath}`);
  return false;
}

console.log('Removing react-helmet imports and usage...\n');
console.log('Note: Metadata should be handled in Next.js page.tsx files using metadata export\n');

let fixedCount = 0;
filesToFix.forEach(file => {
  if (removeHelmet(file)) {
    fixedCount++;
  }
});

console.log(`\n✓ Removed react-helmet from ${fixedCount} files`);
console.log(`⚠ Skipped ${filesToFix.length - fixedCount} files`);
console.log('\nNext steps:');
console.log('1. Add metadata exports to corresponding page.tsx files in src/app/');
console.log('2. Example: export const metadata = { title: "Page Title", description: "..." }');

// Made with Bob
