#!/usr/bin/env node

const { getCurrentDirectoryBase, directoryExists } = require('./utils/files');
const { init } = require('./commands/init');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const argv = require('minimist')(process.argv.slice(2));
const commands = argv._;

let primaryCommand;
if (commands) {
  primaryCommand = commands[0];
}

// console.log('commands', commands);

if (primaryCommand === 'init') {
  init();
} else if (primaryCommand === 'new') {
  // newProject();
} else {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync('Mo', { horizontalLayout: 'full' })
    )
  );
}
