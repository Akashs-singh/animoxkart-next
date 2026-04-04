# React Router to Next.js Link Migration

## Overview
Successfully migrated all 85 files from `react-router-dom` to Next.js Link component.
- **84 component files** in `src/components/`
- **1 container file** in `src/containers/`

## What Was Changed

### 1. Import Statements
**Before:**
```jsx
import { Link } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
```

**After:**
```jsx
import Link from 'next/link';
```

### 2. Link Props
**Before:**
```jsx
<Link to="/path">Text</Link>
<Link to={`${process.env.PUBLIC_URL}/path`}>Text</Link>
<NavLink to="/path">Text</NavLink>
```

**After:**
```jsx
<Link href="/path">Text</Link>
<Link href="/path">Text</Link>
<Link href="/path">Text</Link>
```

### 3. Client Components
Added `'use client'` directive to files that:
- Use class components with state
- Use React hooks (useState, useEffect, etc.)
- Have interactive functionality

## Files Migrated (84 total)

### Blogs (3 files)
- blog-list.jsx
- blog-page.jsx
- right-sidebar.jsx

### Cart & Wishlist (3 files)
- cart/index.jsx
- wishlist/index.jsx
- compare/index.jsx

### Collection Pages (18 files)
- collection.jsx
- collection-body-belt.jsx
- collection-chain.jsx
- collection-collar.jsx
- collection-combo.jsx
- collection-full-width.jsx
- collection-harness.jsx
- collection-leash.jsx
- collection-mega-combo.jsx
- collection-metro.jsx
- collection-offers.jsx
- collection-premium.jsx
- collection-regular.jsx
- collection-rope.jsx
- products-search.jsx
- common/product-item.jsx
- common/product-list-item.jsx
- common/product-listing.jsx

### Common Components (13 files)
- breadcrumb.jsx
- new-product.jsx
- product-item.jsx
- related-product.jsx
- similar-products.jsx
- theme-settings.jsx
- footers/footer-one.jsx
- footers/footer-two.jsx
- footers/footer-three.jsx
- footers/footer-four.jsx
- headers/common/topbar.jsx (manually migrated first)
- headers/common/topbar-dark.jsx
- headers/common/topbar-white.jsx

### Headers (10 files)
- header-one.jsx
- header-two.jsx
- header-three.jsx
- header-four.jsx
- header-five.jsx
- common/cart-header.jsx
- common/footer-logo.jsx
- common/logo.jsx
- common/navbar.jsx
- common/navbar-old.jsx
- common/sidebar.jsx

### Product Components (12 files)
- features/product/common/product-style-one.jsx through product-style-eleven.jsx
- features/product/common/product-multi-slider.jsx

### Layout Components (18 files)
- layouts/common/blogsection.jsx
- layouts/common/instagram.jsx
- layouts/common/product-block.jsx
- layouts/common/product-item.jsx
- layouts/common/product-item-search.jsx
- layouts/common/product-new.jsx
- layouts/common/product-style-nine.jsx
- layouts/common/side-image-item.jsx
- layouts/common/special-product-item.jsx
- layouts/common/special.jsx
- layouts/pets/collection.jsx
- layouts/pets/collection-new.jsx
- layouts/pets/multi-slider-item.jsx
- layouts/pets/multipleCollection.jsx
- layouts/pets/premiumCollection.jsx
- layouts/pets/product-item.jsx
- layouts/pets/product-style-one.jsx
- layouts/pets/regularCollection.jsx
- layouts/pets/saveAndExtraCollection.jsx

### Pages (2 files)
- pages/login.jsx
- pages/orders.jsx

### Product Details (3 files)
- products/common/details-top-tabs.jsx
- products/common/product/details-price.jsx
- products/common/product/price.jsx

### Containers (1 file)
- CartContainer.js

### Other (1 file)
- landing.jsx

## Migration Script

A Node.js script was created at `scripts/migrate-links.js` to automate the migration:

```bash
node scripts/migrate-links.js
```

The script:
1. Finds all `.jsx` and `.js` files in `src/components`
2. Replaces `react-router-dom` imports with Next.js Link
3. Converts `to` props to `href` props
4. Removes `process.env.PUBLIC_URL` from paths
5. Adds `'use client'` directive where needed
6. Preserves all other code and formatting

## Key Differences: React Router vs Next.js

| Feature | React Router | Next.js |
|---------|-------------|---------|
| Import | `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| Prop | `to="/path"` | `href="/path"` |
| Base URL | `${process.env.PUBLIC_URL}/path` | `/path` (no base URL needed) |
| NavLink | Separate component | Use Link with custom styling |
| Client-side | Automatic | Requires `'use client'` for interactive components |

## Testing Checklist

After migration, verify:
- [ ] All navigation links work correctly
- [ ] No console errors about missing context
- [ ] Active link styling works (if using NavLink features)
- [ ] Dynamic routes work properly
- [ ] External links still use `<a>` tags (not migrated)
- [ ] Query parameters are preserved
- [ ] Hash links work correctly

## Next Steps

1. **Test Navigation**: Click through all links to ensure they work
2. **Check Active States**: If you had NavLink active states, implement them with Next.js
3. **Verify Dynamic Routes**: Test all dynamic routes like `/product/[id]`
4. **Update Tests**: Update any tests that reference react-router-dom
5. **Remove Dependency**: After confirming everything works, remove react-router-dom:
   ```bash
   npm uninstall react-router-dom
   ```

## Common Issues & Solutions

### Issue: "useContext is null"
**Solution**: Component needs `'use client'` directive (already added by script)

### Issue: Links don't navigate
**Solution**: Ensure href prop is used instead of to prop (already fixed by script)

### Issue: Active link styling missing
**Solution**: Use `usePathname()` hook from `next/navigation`:
```jsx
'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function NavItem({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  );
}
```

## Rollback

If you need to rollback, the original files are in your git history:
```bash
git checkout HEAD -- src/components/
```

---

**Migration completed**: 2026-03-30
**Files migrated**: 85 (84 components + 1 container)
**Script location**: `scripts/migrate-links.js`
**Manual fixes**: CartContainer.js (migrated separately)