const fs = require('fs');
const path = require('path');
const mv = require('mv');
const mkdirp = require('mkdirp');
const yaml = require('js-yaml');

function getCurrentDirectoryBase() {
  return path.basename(process.cwd());
}

function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}

function moveToChild(base, childPath) {
  // Prepare paths
  const tempLocation = path.normalize(base + '/../.temp-move-to-child');
  const distDir = path.normalize(`${base}/${childPath}`);
  // Return promise
  return new Promise(resolve => {
    // Move to temp location
    mv(base, tempLocation, err => {
      // Make destination direcotry
      mkdirp(distDir, () => {
        // Move to destination directory
        mv(tempLocation, distDir, err => {
          resolve();
        });
      });
    });
  });
}

function getYaml(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
      resolve(doc);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  moveToChild,
  getYaml
};
