// Simple script to list all JavaScript files
const fs = require('fs');
const path = require('path');

// Function to recursively get all JavaScript files in a directory
function getJsFiles(dirPath, arrayOfFiles = []) {
  try {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      
      try {
        if (fs.statSync(filePath).isDirectory()) {
          // Skip node_modules and .git directories
          if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
            arrayOfFiles = getJsFiles(filePath, arrayOfFiles);
          }
        } else if (path.extname(file).toLowerCase() === '.js' || 
                  path.extname(file).toLowerCase() === '.jsx') {
          arrayOfFiles.push(filePath);
        }
      } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dirPath}:`, err.message);
  }

  return arrayOfFiles;
}

// Start indexing from the current directory
console.log('Listing JavaScript files...');
const jsFiles = getJsFiles('.');
console.log(`Found ${jsFiles.length} JavaScript files:`);
jsFiles.forEach(file => console.log(file));
