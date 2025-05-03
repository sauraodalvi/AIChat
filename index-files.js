// Script to index all files in the project
const fs = require('fs');
const path = require('path');

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      // Skip node_modules and .git directories
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to create an index file
function createIndex(files) {
  const indexData = {
    totalFiles: files.length,
    filesByType: {},
    timestamp: new Date().toISOString()
  };

  // Group files by extension
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (!indexData.filesByType[ext]) {
      indexData.filesByType[ext] = [];
    }
    indexData.filesByType[ext].push(file);
  });

  // Write the index file
  fs.writeFileSync('file-index.json', JSON.stringify(indexData, null, 2));
  console.log(`Indexed ${files.length} files. Index saved to file-index.json`);
}

// Start indexing from the current directory
console.log('Starting file indexing...');
const allFiles = getAllFiles('.');
createIndex(allFiles);
