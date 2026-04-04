#!/usr/bin/env node

/**
 * Script to fix any remaining Link components that still use 'to' prop
 * This is a cleanup script to catch edge cases missed by the initial migration
 */

const fs = require('fs');
const path = require('path');

function fixRemainingLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const originalContent = content;

  // Fix any remaining to= props in Link components
  // Pattern: <Link ... to={...}>
  const toPatterns = [
    // to={`${process.env.PUBLIC_URL}/path`}
    {
      pattern: /(<Link[^>]*)\s+to=\{\`\$\{process\.env\.PUBLIC_URL\}([^`]*)\`\}/g,
      replacement: '$1 href="$2"'
    },
    // to={`/path`}
    {
      pattern: /(<Link[^>]*)\s+to=\{\`([^`]*)\`\}/g,
      replacement: '$1 href="$2"'
    },
    // to="/path"
    {
      pattern: /(<Link[^>]*)\s+to="([^"]*)"/g,
      replacement: '$1 href="$2"'
    },
    // to='/path'
    {
      pattern: /(<Link[^>]*)\s+to='([^']*)'/g,
      replacement: "$1 href='$2'"
    },
    // to={variable}
    {
      pattern: /(<Link[^>]*)\s+to=\{([^}]+)\}/g,
      replacement: '$1 href={$2}'
    }
  ];

  toPatterns.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });

  if (modified && content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

function walkDirectory(dir, filePattern = /\.jsx?$/) {
  const files = fs.readdirSync(dir);
  let count = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      count += walkDirectory(filePath, filePattern);
    } else if (filePattern.test(file)) {
      if (fixRemainingLinks(filePath)) {
        count++;
      }
    }
  });

  return count;
}

// Run cleanup
const srcDir = path.join(__dirname, '../src');
console.log('Checking for remaining Link components with "to" prop...\n');
const fixedCount = walkDirectory(srcDir);

if (fixedCount > 0) {
  console.log(`\n✓ Cleanup complete! ${fixedCount} files fixed.`);
} else {
  console.log('\n✓ No issues found. All Link components are using "href" prop.');
}

// Made with Bob
