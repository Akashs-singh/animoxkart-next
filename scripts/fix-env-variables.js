#!/usr/bin/env node

/**
 * Script to replace REACT_APP_ environment variables with NEXT_PUBLIC_
 * Next.js requires NEXT_PUBLIC_ prefix for client-side environment variables
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Replacing REACT_APP_ with NEXT_PUBLIC_ in environment variables...\n');

// Find all files containing REACT_APP_
const findCommand = `find src -type f \\( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \\) -exec grep -l "process\\.env\\.REACT_APP_" {} \\;`;

let files;
try {
  const output = execSync(findCommand, { cwd: path.join(__dirname, '..'), encoding: 'utf8' });
  files = output.trim().split('\n').filter(f => f);
} catch (error) {
  console.log('No files found or error occurred');
  process.exit(0);
}

console.log(`Found ${files.length} files with REACT_APP_ environment variables\n`);

let totalReplacements = 0;

files.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Count occurrences before replacement
  const matches = content.match(/process\.env\.REACT_APP_/g);
  const count = matches ? matches.length : 0;
  
  if (count > 0) {
    // Replace all occurrences
    content = content.replace(/process\.env\.REACT_APP_/g, 'process.env.NEXT_PUBLIC_');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Fixed ${count} occurrence(s) in: ${file}`);
    totalReplacements += count;
  }
});

console.log(`\n✓ Total replacements: ${totalReplacements}`);
console.log('\nNext steps:');
console.log('1. Update your .env file to use NEXT_PUBLIC_ prefix');
console.log('2. Example:');
console.log('   REACT_APP_API_URL=... → NEXT_PUBLIC_API_URL=...');
console.log('   REACT_APP_API_URL_NEW=... → NEXT_PUBLIC_API_URL_NEW=...');
console.log('   REACT_APP_RAZORPAY_ID=... → NEXT_PUBLIC_RAZORPAY_ID=...');
console.log('   REACT_APP_GOOGLE_MAPS_API_KEY=... → NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...');

// Made with Bob
