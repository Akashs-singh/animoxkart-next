#!/usr/bin/env node

/**
 * Script to update page.tsx files to import and use their corresponding components
 */

const fs = require('fs');
const path = require('path');

// Map of page paths to their component imports
const pageComponentMap = {
  'src/app/(shop)/about-us/page.tsx': {
    import: "import AboutUs from '@/components/pages/about-us';",
    component: '<AboutUs />'
  },
  'src/app/(shop)/contact/page.tsx': {
    import: "import Contact from '@/components/pages/contact';",
    component: '<Contact />'
  },
  'src/app/(shop)/login/page.tsx': {
    import: "import Login from '@/components/pages/login';",
    component: '<Login />'
  },
  'src/app/(shop)/register/[[...cashback]]/page.tsx': {
    import: "import Register from '@/components/pages/register';",
    component: '<Register />'
  },
  'src/app/(shop)/dashboard/page.tsx': {
    import: "import Dashboard from '@/components/pages/dashboard';",
    component: '<Dashboard />'
  },
  'src/app/(shop)/orders/page.tsx': {
    import: "import Orders from '@/components/pages/orders';",
    component: '<Orders />'
  },
  'src/app/(shop)/forget-password/page.tsx': {
    import: "import ForgetPassword from '@/components/pages/forget-password';",
    component: '<ForgetPassword />'
  },
  'src/app/(shop)/privacy-policy/page.tsx': {
    import: "import PrivacyPolicy from '@/components/pages/privacy-policy';",
    component: '<PrivacyPolicy />'
  },
  'src/app/(shop)/terms-of-use/page.tsx': {
    import: "import TermsOfUse from '@/components/pages/terms-of-use';",
    component: '<TermsOfUse />'
  },
  'src/app/(shop)/return-and-refunds/page.tsx': {
    import: "import ReturnAndRefunds from '@/components/pages/return-and-refunds';",
    component: '<ReturnAndRefunds />'
  },
  'src/app/(shop)/pages/faq/page.tsx': {
    import: "import FAQ from '@/components/pages/faq';",
    component: '<FAQ />'
  },
  'src/app/(shop)/search/page.tsx': {
    import: "import Search from '@/components/pages/search';",
    component: '<Search />'
  },
  'src/app/(shop)/cart/page.tsx': {
    import: "import Cart from '@/components/cart';",
    component: '<Cart />'
  },
  'src/app/(shop)/wishlist/page.tsx': {
    import: "import Wishlist from '@/components/wishlist';",
    component: '<Wishlist />'
  },
  'src/app/(shop)/compare/page.tsx': {
    import: "import Compare from '@/components/compare';",
    component: '<Compare />'
  },
  'src/app/(shop)/checkout/page.tsx': {
    import: "import Checkout from '@/components/checkout';",
    component: '<Checkout />'
  },
  'src/app/(shop)/blogs/page.tsx': {
    import: "import BlogPage from '@/components/blogs/blog-page';",
    component: '<BlogPage />'
  }
};

function updatePageFile(filePath, config) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠ Skipped (not found): ${filePath}`);
    return false;
  }

  const content = `${config.import}

export default function Page() {
  return ${config.component};
}

// Made with Bob
`;

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Updated: ${filePath}`);
  return true;
}

console.log('Updating page.tsx files with component imports...\n');

let updatedCount = 0;
Object.entries(pageComponentMap).forEach(([filePath, config]) => {
  if (updatePageFile(filePath, config)) {
    updatedCount++;
  }
});

console.log(`\n✓ Updated ${updatedCount} page files`);
console.log(`⚠ Skipped ${Object.keys(pageComponentMap).length - updatedCount} files`);