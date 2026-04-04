#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to replace process.env.PUBLIC_URL with empty string for Next.js compatibility
 * In Next.js, static assets in the public folder are served from the root /
 */

const srcDir = path.join(__dirname, '..', 'src');

// Patterns to replace
const patterns = [
  {
    // Pattern 1: ${process.env.PUBLIC_URL}/
    search: /\$\{process\.env\.PUBLIC_URL\}\//g,
    replace: '/'
  },
  {
    // Pattern 2: `${process.env.PUBLIC_URL}/path` -> `/path`
    search: /`\$\{process\.env\.PUBLIC_URL\}(\/[^`]*)`/g,
    replace: '`$1`'
  },
  {
    // Pattern 3: process.env.PUBLIC_URL (standalone)
    search: /process\.env\.PUBLIC_URL/g,
    replace: '""'
  }
];

let totalFiles = 0;
let totalReplacements = 0;

function processFile(filePath) {
  const ext = path.extname(filePath);
  
  // Only process .js, .jsx, .ts, .tsx files
  if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fileReplacements = 0;

  patterns.forEach(pattern => {
    const matches = content.match(pattern.search);
    if (matches) {
      content = content.replace(pattern.search, pattern.replace);
      modified = true;
      fileReplacements += matches.length;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFiles++;
    totalReplacements += fileReplacements;
    console.log(`✓ Fixed ${fileReplacements} occurrence(s) in: ${path.relative(srcDir, filePath)}`);
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (file !== 'node_modules' && file !== '.next' && file !== 'dist') {
        walkDirectory(filePath);
      }
    } else {
      processFile(filePath);
    }
  });
}

console.log('🔍 Searching for process.env.PUBLIC_URL occurrences...\n');

walkDirectory(srcDir);

console.log('\n' + '='.repeat(60));
console.log(`✅ Complete! Fixed ${totalReplacements} occurrences in ${totalFiles} files.`);
console.log('='.repeat(60));

if (totalFiles === 0) {
  console.log('\n✨ No files needed to be updated!');
} else {
  console.log('\n📝 Summary:');
  console.log(`   - Files modified: ${totalFiles}`);
  console.log(`   - Total replacements: ${totalReplacements}`);
  console.log('\n💡 All static assets now reference /assets/... directly');
}

// Made with Bob
