#!/usr/bin/env node

/**
 * Script to migrate react-router-dom Link/NavLink to Next.js Link
 * Converts:
 * - import {Link} from 'react-router-dom' -> import Link from 'next/link'
 * - import {Link, NavLink} from 'react-router-dom' -> import Link from 'next/link'
 * - <Link to={...}> -> <Link href={...}>
 * - <NavLink to={...}> -> <Link href={...}>
 * - Removes process.env.PUBLIC_URL from paths
 * - Adds 'use client' directive to files with class components or hooks
 */

const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if file already has 'use client'
  const hasUseClient = content.includes("'use client'") || content.includes('"use client"');

  // Replace react-router-dom imports
  if (content.includes("from 'react-router-dom'") || content.includes('from "react-router-dom"')) {
    // Replace various import patterns
    content = content.replace(
      /import\s*{\s*Link\s*,\s*NavLink\s*}\s*from\s*['"]react-router-dom['"]/g,
      "import Link from 'next/link'"
    );
    content = content.replace(
      /import\s*{\s*NavLink\s*,\s*Link\s*}\s*from\s*['"]react-router-dom['"]/g,
      "import Link from 'next/link'"
    );
    content = content.replace(
      /import\s*{\s*Link\s*}\s*from\s*['"]react-router-dom['"]/g,
      "import Link from 'next/link'"
    );
    content = content.replace(
      /import\s*{\s*NavLink\s*}\s*from\s*['"]react-router-dom['"]/g,
      "import Link from 'next/link'"
    );
    modified = true;
  }

  // Replace Link/NavLink 'to' prop with 'href'
  // Pattern: <Link to={`${process.env.PUBLIC_URL}/path`}>
  content = content.replace(
    /<(Link|NavLink)\s+to=\{\`\$\{process\.env\.PUBLIC_URL\}([^`]*)\`\}/g,
    '<Link href="$2"'
  );
  
  // Pattern: <Link to={`/path`}>
  content = content.replace(
    /<(Link|NavLink)\s+to=\{\`([^`]*)\`\}/g,
    '<Link href="$2"'
  );
  
  // Pattern: <Link to="/path">
  content = content.replace(
    /<(Link|NavLink)\s+to="([^"]*)"/g,
    '<Link href="$2"'
  );
  
  // Pattern: <Link to='/path'>
  content = content.replace(
    /<(Link|NavLink)\s+to='([^']*)'/g,
    "<Link href='$2'"
  );

  // Pattern: <Link to={variable}>
  content = content.replace(
    /<(Link|NavLink)\s+to=\{([^}]+)\}/g,
    '<Link href={$2}'
  );

  // Add 'use client' if file has class components or certain hooks and doesn't already have it
  if (!hasUseClient && modified) {
    const needsUseClient = 
      content.includes('class ') && content.includes('extends Component') ||
      content.includes('useState') ||
      content.includes('useEffect') ||
      content.includes('this.state') ||
      content.includes('this.props');
    
    if (needsUseClient) {
      // Add 'use client' at the top, after any comments
      const lines = content.split('\n');
      let insertIndex = 0;
      
      // Skip initial comments
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed === '') {
          insertIndex = i + 1;
        } else {
          break;
        }
      }
      
      lines.splice(insertIndex, 0, "'use client';", '');
      content = lines.join('\n');
    }
  }

  if (modified || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Migrated: ${filePath}`);
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
      if (processFile(filePath)) {
        count++;
      }
    }
  });

  return count;
}

// Run migration
const componentsDir = path.join(__dirname, '../src/components');
console.log('Starting migration of react-router-dom to Next.js Link...\n');
const migratedCount = walkDirectory(componentsDir);
console.log(`\n✓ Migration complete! ${migratedCount} files updated.`);

// Made with Bob
