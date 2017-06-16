'use strict';

const path = require('path');
const { copyPromise } = require('./util');

exports.up = function(config) {
  return new Promise((resolve) => {
    console.log(config);
    return Promise.all(config.map((mapString) => {
      const map = mapString.split(':');
      const source = path.normalize(`${process.cwd()}/${map[0]}`);
      const destination = path.normalize(`${process.cwd()}/mo-src/${map[0]}`);
      return copyPromise(source, destination);
    }));
  });
}

exports.down = function(config) {

}
