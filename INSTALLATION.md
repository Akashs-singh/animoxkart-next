# Installation Guide for Next.js Migration

## Required Dependencies

To complete the migration and run the application, you need to install the following packages:

### Install All Dependencies

Run this command in your terminal:

```bash
npm install @reduxjs/toolkit react-redux redux react-redux-multilingual react-slick slick-carousel react-toastify crypto-js js-cookie
```

### Individual Package Descriptions

1. **@reduxjs/toolkit** - Modern Redux with built-in best practices
2. **react-redux** - Official React bindings for Redux
3. **redux** - Core Redux library
4. **react-redux-multilingual** - Internationalization support
5. **react-slick** - Carousel/slider component
6. **slick-carousel** - Slick carousel CSS
7. **react-toastify** - Toast notifications
8. **crypto-js** - Encryption/decryption library for API data
9. **js-cookie** - Cookie management library

### Optional Development Dependencies

```bash
npm install --save-dev @types/react-redux @types/crypto-js @types/js-cookie
```

## After Installation

1. Run `npm install` to install all dependencies
2. Run `npm run dev` to start the development server
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting

### If you see "Module not found" errors:

1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Restart your development server

### If TypeScript errors persist:

1. Run `npm run build` to check for build errors
2. Check that all type declaration files are in place
3. Restart your IDE/editor

## Environment Setup

Make sure your API endpoints are configured correctly in:
- `src/api/shop.js` - Update `API_URL` and `API_URL2` to your backend URLs

## Next Steps

After installation:
1. Review `MIGRATION_GUIDE.md` for detailed migration information
2. Test all Redux functionality (cart, wishlist, compare)
3. Verify API data fetching works correctly
4. Test internationalization features
5. Check responsive design with sliders

## Support

If you encounter any issues:
1. Check the console for specific error messages
2. Verify all dependencies are installed correctly
3. Ensure your Node.js version is compatible (Node 18+ recommended)
4. Review the migration guide for additional context