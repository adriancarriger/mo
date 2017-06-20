'use strict';

const path = require('path');
const { copyPromise } = require('./util');

exports.up = function(config, directory) {
  return Promise.all(config.map((mapString) => {
    const map = mapString.split(':');
    const source = path.normalize(`${process.cwd()}/${map[0]}`);
    const destination = path.normalize(`${directory}/${map[1]}/${map[0]}`);
    return copyPromise(source, destination);
  }));
}

exports.down = function(config, directory) {

}
