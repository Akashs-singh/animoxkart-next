#!/usr/bin/env node

/**
 * Script to add 'use client' directive to all files using dynamic imports with ssr: false
 * This is required in Next.js 13+ App Router
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/pages/lookbook.jsx',
  'src/components/pages/404.jsx',
  'src/components/pages/about-us.jsx',
  'src/components/compare/index.jsx',
  'src/components/pages/welcome.jsx',
  'src/components/common/new-product.jsx',
  'src/components/common/similar-products.jsx',
  'src/components/layouts/common/collection.jsx',
  'src/components/layouts/common/instagram.jsx',
  'src/components/layouts/pets/premiumCollection.jsx',
  'src/components/layouts/pets/collection-new.jsx',
  'src/components/layouts/pets/multipleCollection.jsx',
  'src/components/layouts/pets/main.jsx',
  'src/components/layouts/pets/regularCollection.jsx',
  'src/components/layouts/pets/multi-slider-item.jsx',
  'src/components/layouts/pets/saveAndExtraCollection.jsx',
  'src/components/layouts/pets/collection.jsx',
  'src/components/layouts/common/logo-block.jsx',
  'src/components/layouts/common/blogsection.jsx',
  'src/components/layouts/common/special.jsx',
  'src/components/common/related-product.jsx',
  'src/components/products/accordian.jsx',
  'src/components/features/product/common/product-multi-slider.jsx',
  'src/components/collection/common/product-types.jsx',
  'src/components/products/vertical.jsx',
  'src/components/collection/common/product-block.jsx',
  'src/components/products/common/logo-block.jsx',
  'src/components/products/common/product/price.jsx',
  'src/components/products/common/product/small-image.jsx',
  'src/components/collection/collection-no-sidebar.jsx',
  'src/components/products/common/product/details-price.jsx',
  'src/components/products/no-sidebar.jsx',
  'src/components/products/column.jsx',
  'src/components/products/right-sidebar.jsx',
  'src/components/products/column-right.jsx',
  'src/components/products/right-image.jsx',
  'src/components/products/column-left.jsx',
  'src/components/products/left-sidebar.jsx',
  'src/components/products/left-image.jsx',
  'src/components/products/view-product.jsx'
];

function addUseClientDirective(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠ Skipped (not found): ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if 'use client' already exists
  if (content.trim().startsWith("'use client'") || content.trim().startsWith('"use client"')) {
    console.log(`⚠ Skipped (already has directive): ${filePath}`);
    return false;
  }
  
  // Add 'use client' at the very beginning
  content = "'use client';\n\n" + content;
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Fixed: ${filePath}`);
  return true;
}

console.log('Adding "use client" directive to files with dynamic imports...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
  if (addUseClientDirective(file)) {
    fixedCount++;
  }
});

console.log(`\n✓ Added "use client" directive to ${fixedCount} files`);
console.log(`⚠ Skipped ${filesToFix.length - fixedCount} files (already fixed or not found)`);

// Made with Bob
