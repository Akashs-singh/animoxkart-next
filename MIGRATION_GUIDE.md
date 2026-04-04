# Redux Store Migration Guide for Next.js App Router

This document explains the Redux store migration from the legacy setup to Next.js 13+ App Router compatible implementation.

## Overview

The Redux store has been migrated to work seamlessly with Next.js App Router while maintaining all existing functionality.

## Changes Made

### 1. New Store Configuration (`src/store/store.ts`)

**Key Features:**
- Uses `@reduxjs/toolkit`'s `configureStore` instead of legacy `createStore`
- Client-side only localStorage operations with SSR safety checks
- TypeScript support with proper type inference
- Maintains all existing reducers and functionality

**Important Changes:**
```typescript
// Old approach (src/store/index.js)
const store = createStore(rootReducer, persistedState, compose(...))

// New approach (src/store/store.ts)
export const makeStore = () => {
  const persistedState = loadFromLocalStorage();
  return configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    // ...
  });
};
```

### 2. Redux Provider Component (`src/store/StoreProvider.tsx`)

**Purpose:** Wraps the application with Redux Provider as a Client Component

**Usage:**
```tsx
'use client';

export default function StoreProvider({ children }) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

### 3. TypeScript Hooks (`src/store/hooks.ts`)

**Purpose:** Provides typed versions of Redux hooks

**Usage in Components:**
```typescript
// Instead of useDispatch and useSelector
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function MyComponent() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);
  // ...
}
```

### 4. Internationalization Wrapper (`src/components/IntlProviderWrapper.tsx`)

**Purpose:** Wraps children with IntlProvider using Redux state

**Features:**
- Client component that reads Intl state from Redux
- Provides translations to all child components

### 5. Root Layout Integration (`src/app/layout.tsx`)

**Structure:**
```tsx
<StoreProvider>
  <IntlProviderWrapper>
    {children}
  </IntlProviderWrapper>
</StoreProvider>
```

## Migration Checklist

- [x] Created new TypeScript store configuration
- [x] Added SSR-safe localStorage operations
- [x] Created StoreProvider client component
- [x] Created typed Redux hooks
- [x] Created IntlProviderWrapper component
- [x] Updated root layout with providers
- [x] Maintained all existing reducers
- [x] Preserved localStorage persistence

## Existing Reducers (Unchanged)

All existing reducers remain functional:
- `products.js` - Product data management
- `cart.js` - Shopping cart state
- `filters.js` - Product filtering
- `wishlist.js` - Wishlist management
- `compare.js` - Product comparison
- `tags.js` - Tag management
- `Intl` - Internationalization (from react-redux-multilingual)

## Required Dependencies

Ensure these packages are installed:

```json
{
  "@reduxjs/toolkit": "^2.0.0",
  "react-redux": "^9.0.0",
  "redux": "^5.0.0",
  "redux-thunk": "^3.0.0",
  "react-redux-multilingual": "^2.0.0"
}
```

## Usage in Components

### Client Components (with 'use client')

```tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function MyComponent() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartList);
  
  // Use dispatch and state as before
  return <div>{/* ... */}</div>;
}
```

### Server Components

Server components cannot directly access Redux state. Use Client Components for Redux-connected UI.

## Breaking Changes

**None** - All existing functionality is preserved. The migration is backward compatible with existing action creators and reducers.

## Benefits

1. **Next.js 13+ Compatible** - Works with App Router
2. **TypeScript Support** - Full type safety
3. **SSR Safe** - Proper handling of server/client rendering
4. **Modern Redux** - Uses Redux Toolkit best practices
5. **Maintained Functionality** - All existing features work as before
6. **Better DevTools** - Improved Redux DevTools integration

## Testing

After migration, test:
1. Cart operations (add, remove, update)
2. Wishlist functionality
3. Product filtering
4. Compare feature
5. Internationalization
6. LocalStorage persistence
7. Page navigation and state preservation

## Troubleshooting

### Issue: "window is not defined"
**Solution:** Ensure localStorage operations are wrapped in `typeof window !== 'undefined'` checks

### Issue: "Hydration mismatch"
**Solution:** Use Client Components ('use client') for Redux-connected components

### Issue: State not persisting
**Solution:** Check browser localStorage and ensure store subscription is working

## Next Steps

1. Install required dependencies if not present
2. Test all Redux-connected features
3. Update any custom middleware if needed
4. Migrate remaining components to use new hooks
5. Consider migrating reducers to Redux Toolkit slices (optional)

## Support

For issues or questions about the migration, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)