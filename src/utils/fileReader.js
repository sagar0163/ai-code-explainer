/**
 * File Reader Utility
 * Handles reading code from files and stdin
 */

const fs = require('fs');
const path = require('path');

/**
 * Read code from a file path
 */
function fromPath(filePath) {
  try {
    // Resolve relative paths
    const absolutePath = path.resolve(filePath);
    
    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read file content
    const content = fs.readFileSync(absolutePath, 'utf8');
    
    // Check if file is empty
    if (!content.trim()) {
      throw new Error(`File is empty: ${filePath}`);
    }

    return content;
  } catch (error) {
    if (error.code === 'EISDIR') {
      throw new Error(`Path is a directory: ${filePath}`);
    }
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw error;
  }
}

/**
 * Read code from stdin
 */
async function fromStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    
    process.stdin.on('end', () => {
      resolve(data);
    });
    
    process.stdin.on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = { fromPath, fromStdin };
