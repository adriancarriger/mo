#!/usr/bin/env node

const program = require('commander');

const { moveToChild } = require('./utils/files');

program
  .option('-t, --tests', 'test option')
  .parse(process.argv);


moveToChild(process.cwd(), 'mo-dist')
  .then(() => console.log('done!'));
