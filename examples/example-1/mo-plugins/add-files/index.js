'use strict';

const path = require('path');
const fs = require('fs-extra');

exports.up = function(config, directory) {
  return Promise.all(config.map((mapString) => {
    const [sourcePath, destPath] = mapString.split(':');
    const source = path.normalize(`${process.cwd()}/${sourcePath}`);
    const destination = path.normalize(`${directory}/${destPath}/${sourcePath}`);
    return fs.copy(source, destination, { overwrite: true });
  }));
}

exports.down = function(config, directory) {

}
