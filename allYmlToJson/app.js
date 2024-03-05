const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function convertYmlToJson(inputPath) {
  // Check if the input path is a directory
  if (fs.lstatSync(inputPath).isDirectory()) {
    // Read all files and directories in the input path
    fs.readdirSync(inputPath).forEach((file) => {
      // Get the full path of the file or directory
      const fullPath = path.join(inputPath, file);

      // Recursively call the function for directories
      if (fs.lstatSync(fullPath).isDirectory()) {
        convertYmlToJson(fullPath);
      }

      // Call the ymlToJson script for files
      if (path.extname(fullPath) === '.yml') {
        const childProcess = spawn('node', ['../ymlToJson/app.js', fullPath]);

        childProcess.stdout.on('data', (data) => {
          console.log(data.toString());
        });

        childProcess.stderr.on('data', (data) => {
          console.error(data.toString());
        });
      }
    });
  }
}

// Get the input path from the command line arguments
const inputPath = process.argv[2];

// Call the function with the input path
convertYmlToJson(inputPath);
