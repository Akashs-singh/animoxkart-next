#!/usr/bin/env node

/**
 * Script to fix react-slick hydration issues
 * Converts static imports to dynamic imports and adds isMounted state
 */

const fs = require('fs');
const path = require('path');

function fixSliderHydration(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file uses react-slick
  if (!content.includes("import Slider from 'react-slick'")) {
    return false;
  }
  
  let modified = false;
  
  // Replace static import with dynamic import
  content = content.replace(
    /import Slider from ['"]react-slick['"];?/g,
    "import dynamic from 'next/dynamic';\n\n// Dynamically import Slider to avoid SSR hydration issues\nconst Slider = dynamic(() => import('react-slick'), { ssr: false });"
  );
  modified = true;
  
  // Check if it's a class component
  const isClassComponent = content.includes('extends Component') || content.includes('extends React.Component');
  
  if (isClassComponent) {
    // Add isMounted state to constructor if not already present
    if (!content.includes('isMounted')) {
      // Find constructor
      const constructorMatch = content.match(/(constructor\s*\([^)]*\)\s*\{[^}]*this\.state\s*=\s*\{)/);
      if (constructorMatch) {
        content = content.replace(
          /(this\.state\s*=\s*\{)/,
          '$1\n            isMounted: false,'
        );
      } else {
        // No constructor with state, add one
        const classMatch = content.match(/(class\s+\w+\s+extends\s+\w+\s*\{)/);
        if (classMatch) {
          content = content.replace(
            classMatch[0],
            classMatch[0] + '\n    constructor(props) {\n        super(props);\n        this.state = {\n            isMounted: false\n        };\n    }\n'
          );
        }
      }
      
      // Add componentDidMount if not present
      if (!content.includes('componentDidMount')) {
        const classMatch = content.match(/(class\s+\w+\s+extends\s+\w+\s*\{[^]*?)(render\s*\(\s*\)\s*\{)/);
        if (classMatch) {
          content = content.replace(
            classMatch[2],
            '\n    componentDidMount() {\n        this.setState({ isMounted: true });\n    }\n\n    ' + classMatch[2]
          );
        }
      } else {
        // Add setState to existing componentDidMount
        if (!content.includes("setState({ isMounted: true })")) {
          content = content.replace(
            /(componentDidMount\s*\(\s*\)\s*\{)/,
            '$1\n        this.setState({ isMounted: true });'
          );
        }
      }
      
      // Wrap Slider with isMounted check
      content = content.replace(
        /(<Slider\s)/g,
        '{this.state.isMounted && (\n                            $1'
      );
      content = content.replace(
        /(<\/Slider>)/g,
        '$1\n                            )}'
      );
    }
  }
  
  if (modified) {
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
      if (fixSliderHydration(filePath)) {
        count++;
      }
    }
  });

  return count;
}

// Run fix
const srcDir = path.join(__dirname, '../src');
console.log('Fixing react-slick hydration issues...\n');
const fixedCount = walkDirectory(srcDir);
console.log(`\n✓ Fixed ${fixedCount} files`);

// Made with Bob
