#!/usr/bin/env node

/**
 * Script to fix componentWillMount usage
 * Replaces deprecated componentWillMount with componentDidMount
 * Adds window checks where needed
 */

const fs = require('fs');
const path = require('path');

function fixComponentWillMount(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if file has componentWillMount
  if (!content.includes('componentWillMount')) {
    return false;
  }
  
  // Replace componentWillMount with componentDidMount
  const oldPattern = /componentWillMount\s*\(\s*\)\s*\{/g;
  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, 'componentDidMount() {');
    modified = true;
  }
  
  // Add window checks if window is accessed directly
  // Pattern: if (window.innerWidth
  content = content.replace(
    /(\s+)(if\s*\(\s*window\.)/g,
    '$1if (typeof window !== \'undefined\' && window.'
  );
  
  // Pattern: window.addEventListener without check
  content = content.replace(
    /(\s+)(window\.addEventListener)/g,
    function(match, spaces, code) {
      // Check if already has typeof check in the line
      const lines = content.split('\n');
      const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;
      const currentLine = lines[lineIndex];
      
      if (currentLine.includes('typeof window')) {
        return match; // Already has check
      }
      return spaces + 'if (typeof window !== \'undefined\') ' + code;
    }
  );
  
  // Pattern: document.querySelector without check
  content = content.replace(
    /(\s+)(document\.querySelector)/g,
    function(match, spaces, code) {
      const lines = content.split('\n');
      const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;
      const currentLine = lines[lineIndex];
      
      if (currentLine.includes('typeof document') || currentLine.includes('typeof window')) {
        return match;
      }
      return spaces + 'if (typeof document !== \'undefined\') ' + code;
    }
  );
  
  if (modified || content !== fs.readFileSync(filePath, 'utf8')) {
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
      if (fixComponentWillMount(filePath)) {
        count++;
      }
    }
  });

  return count;
}

// Run fix
const srcDir = path.join(__dirname, '../src');
console.log('Fixing componentWillMount and window access...\n');
const fixedCount = walkDirectory(srcDir);
console.log(`\n✓ Fixed ${fixedCount} files`);

// Made with Bob
