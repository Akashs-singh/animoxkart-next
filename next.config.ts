// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your current app uses SCSS
  // sassOptions: {
  //   includePaths: ['./src', './public'],
  // },
  sassOptions: {
    includePaths: [
      './public/assets/scss',
      './public/assets',
      './src',
      './public'
    ],
  },

  // Allows server components to import heavy libs safely (moved from experimental)
  serverExternalPackages: ['firebase-admin'],

  // Your images — add your API domain here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // tighten this to your actual API domain later
      },
    ],
  },

  // Replaces process.env.PUBLIC_URL — no longer needed in Next.js
  // All public assets are served from /public automatically
}

module.exports = nextConfig