const fs = require('fs-extra');
const path = require('path');

const mkdirp = require('mkdirp');
const yaml = require('js-yaml');
const { ncp } = require('ncp');

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
  // Move to temp location
  return fs.move(base, tempLocation)
    .then(() => fs.move(tempLocation, distDir, { overwrite: true }));
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
