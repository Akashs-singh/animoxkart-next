# Server-Side Rendering (SSR) Fixes

## Overview
This document details all fixes applied to make the application compatible with Next.js Server-Side Rendering.

## Issues Fixed

### 1. Window is Not Defined Error
**Problem:** Libraries trying to access `window` object during server-side rendering.

**Solution:** Use Next.js dynamic imports with `ssr: false` option.

#### Files Fixed:
- `src/components/common/headers/header-one.jsx`
- `src/components/common/headers/header-two.jsx`
- `src/components/common/headers/header-three.jsx`
- `src/components/common/headers/header-four.jsx`
- `src/components/common/headers/header-five.jsx`

**Before:**
```javascript
import Pace from 'react-pace-progress'
```

**After:**
```javascript
import dynamic from 'next/dynamic';

// Dynamically import Pace to avoid SSR issues
const Pace = dynamic(() => import('react-pace-progress'), { ssr: false });
```

### 2. LocalStorage Access During SSR
**Problem:** Redux store trying to access `localStorage` during server-side rendering.

**Solution:** Add `typeof window !== 'undefined'` checks.

#### Files Fixed:
- `src/store/store.ts`
- `src/store/index.js`

**Implementation:**
```typescript
function loadFromLocalStorage(): RootState | undefined {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    }
    return undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
```

### 3. Deprecated React Lifecycle Methods
**Problem:** `componentWillMount` is deprecated and causes warnings.

**Solution:** Move logic to `componentDidMount`.

**Before:**
```javascript
componentWillMount(){
    window.addEventListener('scroll', this.handleScroll);
}
```

**After:**
```javascript
componentDidMount() {
    // ... other code
    window.addEventListener('scroll', this.handleScroll);
}
```

### 4. Null Safety in Service Functions
**Problem:** Accessing properties on potentially null objects.

**Solution:** Add null checks before accessing properties.

#### Files Fixed:
- `src/services/index.js` (8 functions)

**Before:**
```javascript
product.tags.includes(tag)
```

**After:**
```javascript
product.tags && product.tags.includes(tag)
```

## Scripts Created

### 1. fix-pace-imports.js
Automatically fixes react-pace-progress imports in header files.

**Usage:**
```bash
node scripts/fix-pace-imports.js
```

**What it does:**
- Replaces static imports with dynamic imports
- Adds `ssr: false` option
- Fixes deprecated lifecycle methods

## Best Practices for SSR

### 1. Browser-Only Code
Always check for window/document before accessing:
```javascript
if (typeof window !== 'undefined') {
  // Browser-only code
  window.localStorage.setItem('key', 'value');
}
```

### 2. Dynamic Imports
For libraries that don't support SSR:
```javascript
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(
  () => import('./ClientOnlyComponent'),
  { ssr: false }
);
```

### 3. Client Components
Use `'use client'` directive for components that:
- Use browser APIs
- Have event handlers
- Use React hooks like useState, useEffect
- Access window, document, localStorage

### 4. Null Safety
Always check for null/undefined before accessing properties:
```javascript
// Bad
const value = object.property.nestedProperty;

// Good
const value = object?.property?.nestedProperty;
// or
const value = object && object.property && object.property.nestedProperty;
```

## Testing SSR Compatibility

### 1. Build Test
```bash
npm run build
```
Should complete without errors.

### 2. Production Test
```bash
npm run build
npm start
```
Application should load without console errors.

### 3. Check for SSR Issues
Look for these errors in console:
- "window is not defined"
- "document is not defined"
- "localStorage is not defined"
- "navigator is not defined"

## Common SSR Issues and Solutions

| Issue | Solution |
|-------|----------|
| window is not defined | Use dynamic import with ssr: false |
| localStorage is not defined | Check typeof window !== 'undefined' |
| document is not defined | Move to useEffect or componentDidMount |
| navigator is not defined | Check typeof navigator !== 'undefined' |
| Hydration mismatch | Ensure server and client render same content |

## Files Modified Summary

**Total Files Modified:** 10

**Categories:**
- Header Components: 5 files
- Store Configuration: 2 files
- Service Functions: 1 file
- Scripts Created: 3 files

## Verification

All SSR issues have been resolved. The application now:
- ✅ Builds successfully
- ✅ Runs without SSR errors
- ✅ Properly hydrates on client
- ✅ Handles browser APIs safely
- ✅ Uses dynamic imports where needed

---

**Last Updated:** 2026-03-30  
**Next.js Version:** 13+  
**Status:** Production Ready