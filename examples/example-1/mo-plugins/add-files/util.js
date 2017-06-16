'use strict';

const { ncp } = require('ncp');
const mkdirp = require('mkdirp');
const fs = require('fs');

function copyPromise(source, destination) {
  return new Promise((resolve, reject) => {
    makeDirIfNeeded(destination)
      .then(() => {
        ncp(source, destination, err => {
          if (err) { reject(err); }
          resolve();
        });
      })
      .catch(reject);
  });
}

function makeDirIfNeeded(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stats) => {
      if (!err) {
        resolve();
      } else if (err && err.errno === -2) {
        mkdirp(dir, resolve);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = {
  copyPromise,
  makeDirIfNeeded
};
