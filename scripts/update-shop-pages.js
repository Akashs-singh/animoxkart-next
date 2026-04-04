#!/usr/bin/env node

/**
 * Script to update shop and product page.tsx files
 */

const fs = require('fs');
const path = require('path');

// Map of page paths to their component imports
const pageComponentMap = {
  'src/app/(shop)/shop/regular/page.tsx': {
    import: "import CollectionRegular from '@/components/collection/collection-regular';",
    component: '<CollectionRegular />'
  },
  'src/app/(shop)/shop/premium/page.tsx': {
    import: "import CollectionPremium from '@/components/collection/collection-premium';",
    component: '<CollectionPremium />'
  },
  'src/app/(shop)/shop/combo/page.tsx': {
    import: "import CollectionCombo from '@/components/collection/collection-combo';",
    component: '<CollectionCombo />'
  },
  'src/app/(shop)/shop/mega-combo/page.tsx': {
    import: "import CollectionMegaCombo from '@/components/collection/collection-mega-combo';",
    component: '<CollectionMegaCombo />'
  },
  'src/app/(shop)/shop/offers/page.tsx': {
    import: "import CollectionOffers from '@/components/collection/collection-offers';",
    component: '<CollectionOffers />'
  },
  'src/app/(shop)/product/[category_name]/page.tsx': {
    import: "import Collection from '@/components/collection/collection';",
    component: '<Collection params={resolvedParams} />',
    async: true
  },
  'src/app/(shop)/view/product/[id]/page.tsx': {
    import: "import ViewProduct from '@/components/products/view-product';",
    component: '<ViewProduct params={resolvedParams} />',
    async: true
  }
};

function updatePageFile(filePath, config) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠ Skipped (not found): ${filePath}`);
    return false;
  }

  let content;
  
  if (config.async) {
    // For dynamic routes with params
    content = `${config.import}

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}) {
  const resolvedParams = await params;
  return ${config.component};
}

// Made with Bob
`;
  } else {
    // For static routes
    content = `${config.import}

export default function Page() {
  return ${config.component};
}

// Made with Bob
`;
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Updated: ${filePath}`);
  return true;
}

console.log('Updating shop and product page.tsx files...\n');

let updatedCount = 0;
Object.entries(pageComponentMap).forEach(([filePath, config]) => {
  if (updatePageFile(filePath, config)) {
    updatedCount++;
  }
});

console.log(`\n✓ Updated ${updatedCount} page files`);
console.log(`⚠ Skipped ${Object.keys(pageComponentMap).length - updatedCount} files`);