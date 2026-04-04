#!/usr/bin/env node

/**
 * Script to update remaining page.tsx files
 */

const fs = require('fs');
const path = require('path');

// Map of page paths to their component imports
const pageComponentMap = {
  'src/app/(shop)/order-success/page.tsx': {
    import: "import OrderSuccess from '@/components/email/order-success';",
    component: '<OrderSuccess />'
  },
  'src/app/(shop)/pet-finder-tag/page.tsx': {
    import: "import PetFinder from '@/components/smart_pet/pet-finder';",
    component: '<PetFinder />'
  },
  'src/app/(shop)/pet-finder-tag/intro/page.tsx': {
    import: "import PetFinderIntro from '@/components/smart_pet/intro';",
    component: '<PetFinderIntro />'
  },
  'src/app/(shop)/pet-finder-tag/register/[tag_id]/page.tsx': {
    import: "import AddPetFinder from '@/components/smart_pet/add-pet-finder';",
    component: '<AddPetFinder params={resolvedParams} />',
    async: true
  },
  'src/app/(shop)/pet-finder-tag/update/[tag_id]/page.tsx': {
    import: "import UpdatePetFinder from '@/components/smart_pet/update-pet-finder';",
    component: '<UpdatePetFinder params={resolvedParams} />',
    async: true
  },
  'src/app/(shop)/pet-finder-tag/view/[tag_id]/page.tsx': {
    import: "import ViewPet from '@/components/smart_pet/view-pet';",
    component: '<ViewPet params={resolvedParams} />',
    async: true
  },
  'src/app/(shop)/finder-tag/[tag_id]/page.tsx': {
    import: "import FinderTag from '@/components/smart_pet/finder-tag';",
    component: '<FinderTag params={resolvedParams} />',
    async: true
  },
  'src/app/(shop)/my-pets/page.tsx': {
    import: "import MyPets from '@/components/smart_pet/my-pets';",
    component: '<MyPets />'
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

console.log('Updating remaining page.tsx files...\n');

let updatedCount = 0;
Object.entries(pageComponentMap).forEach(([filePath, config]) => {
  if (updatePageFile(filePath, config)) {
    updatedCount++;
  }
});

console.log(`\n✓ Updated ${updatedCount} page files`);
console.log(`⚠ Skipped ${Object.keys(pageComponentMap).length - updatedCount} files`);