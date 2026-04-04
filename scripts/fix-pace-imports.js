#!/usr/bin/env node

/**
 * Script to fix react-pace-progress imports to use Next.js dynamic imports
 * This prevents "window is not defined" errors during SSR
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/common/headers/header-two.jsx',
  'src/components/common/headers/header-three.jsx',
  'src/components/common/headers/header-four.jsx',
  'src/components/common/headers/header-five.jsx'
];

function fixPaceImport(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace the Pace import
  const oldImport = /import Pace from ['"]react-pace-progress['"]/g;
  const newImport = `import dynamic from 'next/dynamic';\n\n// Dynamically import Pace to avoid SSR issues\nconst Pace = dynamic(() => import('react-pace-progress'), { ssr: false });`;
  
  if (oldImport.test(content)) {
    content = content.replace(oldImport, newImport);
    
    // Also fix componentWillMount if present
    content = content.replace(
      /componentWillMount\(\)\s*\{/g,
      'componentDidMount() {\n        // Moved from componentWillMount (deprecated)'
    );
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

console.log('Fixing react-pace-progress imports...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
  if (fixPaceImport(file)) {
    fixedCount++;
  }
});

console.log(`\n✓ Fixed ${fixedCount} files`);

// Made with Bob
