#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const program = require('commander');
const figlet = require('figlet');
const fs = require('fs-extra');
let showingHelp = false;

program
  .version('0.0.1')
  .command('init', 'init a new project in current directory')
  .command('clone <url>', 'git clones a project into mo format')
  .command('import', 'gets repo from mo-dist, applies mo plugins, and puts it inside mo-src')
  .command('export', 'gets repo from mo-src, applies mo plugins, and puts it inside mo-dist');

if (!process.argv.slice(2).length) {
  showHelp();
}

fs.pathExists(`${process.cwd()}/mo.yml`).then(exists => {
  if (!exists && !showingHelp) {
    showHelp('It doesn\'t look like this is a Mo project. You may need to run `mo init`');
  } else {
    program.parse(process.argv);
  }
});

function showHelp(message) {
  showingHelp = true;
  clear();
  console.log(
    chalk.green(
      figlet.textSync('Mo', { horizontalLayout: 'full' })
    )
  );
  if (message) {
    console.log(
      chalk.red(message)
    );
  }
  program.help();
}
